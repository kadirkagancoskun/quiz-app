import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

const texts = {
  leicht: [
    "Heute ist das Wetter sehr schön.",
    "Mein Name ist Ahmet.",
  ],
  mittel: [
    "Ich trinke morgens gerne Kaffee.",
    "Lesen erhöht das Wissen eines Menschen.",
  ],
  schwer: [
    "Die digitale Transformation führt zu großen Veränderungen in der Geschäftswelt.",
    "Künstliche Intelligenz wird eine der wichtigsten Technologien der Zukunft sein.",
  ],
};

export default function ListeningQuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const level = typeof params.level === "string" ? params.level.toLowerCase() : "leicht"; // Küçük harfe çevir

  console.log("Seçilen Level:", level); // Debugging için konsola yazdır

  const quiz = texts[level as keyof typeof texts] || texts["leicht"]; // Geçersiz değer olursa 'leicht' kullan

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (quiz.length > 0) {
      readText();
    }
  }, [index]);

  const readText = () => {
    if (quiz[index]) {
      Speech.speak(quiz[index], {
        language: "de-DE",
        rate: 0.9,
      });
    }
  };

  const handleAnswer = async () => {
    let newScore = score;

    if (quiz[index] && answer.trim().toLowerCase() === quiz[index].toLowerCase()) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (index < quiz.length - 1) {
      setIndex(index + 1);
      setAnswer("");
    } else {
      const result = { level, score: newScore, date: new Date().toISOString() };
      const history = JSON.parse((await AsyncStorage.getItem("quizHistory")) || "[]");
      await AsyncStorage.setItem("quizHistory", JSON.stringify([...history, result]));

      setScore(0);
      setIndex(0);
      setAnswer("");

      router.push("/history");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hörverstehen {index + 1}/{quiz.length}</Text>

      <TouchableOpacity style={styles.speakButton} onPress={readText}>
        <Text style={styles.speakButtonText}>Text wiederholen</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder="Schreibe, was du gehört hast"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleAnswer}>
        <Text style={styles.buttonText}>Antworten</Text>
      </TouchableOpacity>

      <Text style={styles.score}>Punktzahl: {score}/{quiz.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  speakButton: {
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  speakButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#444",
    color: "#FFF",
    borderRadius: 8,
    padding: 12,
    width: "90%",
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  score: {
    color: "#FFF",
    fontSize: 18,
    marginTop: 15,
  },
});
