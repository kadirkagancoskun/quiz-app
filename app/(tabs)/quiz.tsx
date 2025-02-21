import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const questions = {
  kolay: [
    { question: "2 + 2 ?", answer: "4" },
    { question: "5 - 3 ?", answer: "2" },
  ],
  orta: [
    { question: "12 / 4 ?", answer: "3" },
    { question: "8 * 3 ?", answer: "24" },
  ],
  zor: [
    { question: "√49 ?", answer: "7" },
    { question: "15 % 4 ?", answer: "3" },
  ],
};

export default function QuizScreen() {
  const router = useRouter();
  const { level } = useLocalSearchParams();
  const quiz = questions[level as keyof typeof questions];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const handleAnswer = async () => {
    let newScore = score;
    
    if (answer.trim() === quiz[index].answer) {
      newScore = score + 1;
      setScore(newScore); // Skoru güncelle
    }
  
    if (index < quiz.length - 1) {
      setIndex(index + 1);
      setAnswer("");
    } else {
      // Skoru history'ye kaydet
      const result = { level, score: newScore, date: new Date().toISOString() };
      const history = JSON.parse((await AsyncStorage.getItem("quizHistory")) || "[]");
      await AsyncStorage.setItem("quizHistory", JSON.stringify([...history, result]));
  
      // **Skoru ve index'i sıfırla**
      setScore(0);
      setIndex(0);
      setAnswer("");
  
      // History ekranına yönlendir
      router.push("/history");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soru {index + 1}/{quiz.length}</Text>
      <Text  style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{quiz[index].question}</Text>
      <TextInput style={styles.input} value={answer} onChangeText={setAnswer} placeholder="Cevabını yaz" />
      <Button title="Cevapla" onPress={handleAnswer} />
      <Text style={{ color: 'white'}}>Skor: {score}/{quiz.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    color: "white",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: "80%",
  },
});
