import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
<<<<<<< HEAD

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
=======
import axios from "axios";

import { API_KEY } from '@env';
>>>>>>> 720cf9b (update)

export default function ListeningQuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
<<<<<<< HEAD
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
=======
  const level = typeof params.level === "string" ? params.level : "A2";
  const language = typeof params.language === "string" ? params.language : "de";
  const [quiz, setQuiz] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsFinished(false);
    setIndex(0);
    setScore(0);
    setAnswer("");
  }, [level, language]);
  
  useEffect(() => {
    fetchQuizData();
  }, [level, language]);

  const fetchQuizData = async () => {
    setQuiz([]);
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `Give me 5 random sentences with ${level} vocabulary and grammar in (${language}).` },
          { role: "user", content: `Give me 5 random sentences with ${level} vocabulary and grammar in (${language}).` },
        ],
      }, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      
      const sentences = response.data.choices[0].message.content
  .split("\n")
  .map((sentence: string) => sentence.replace(/^\d+\.\s*/, "").trim());
      setQuiz(sentences);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    if (quiz.length > 0 && index < quiz.length) {
      readText();
    }
  }, [index, quiz]);
>>>>>>> 720cf9b (update)

  const readText = () => {
    if (quiz[index]) {
      Speech.speak(quiz[index], {
<<<<<<< HEAD
        language: "de-DE",
=======
        language: language === "de" ? "de-DE" : language === "en" ? "en-US" : "es-ES",
>>>>>>> 720cf9b (update)
        rate: 0.9,
      });
    }
  };

<<<<<<< HEAD
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
=======
  const handleNext = async () => {
    if (answer.trim().toLowerCase() === quiz[index].trim().toLowerCase()) {
      setScore(score + 1);
    }
    if (index + 1 < quiz.length) {
      setIndex(index + 1);
      setAnswer("");
    } else {
      setIsFinished(true);
      await saveToHistory();
    }
  };

  const saveToHistory = async () => {
    const newEntry = { level, language, score, date: new Date().toISOString() };
    try {
      const storedHistory = JSON.parse((await AsyncStorage.getItem("quizHistory")) || "[]");
      storedHistory.push(newEntry);
      await AsyncStorage.setItem("quizHistory", JSON.stringify(storedHistory));
    } catch (error) {
      console.error("Error saving history:", error);
>>>>>>> 720cf9b (update)
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
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
=======
      {isFinished ? (
        <>
          <Text style={styles.title}>🎉 Test Completed! 🎉</Text>
          <Text style={styles.score}>Skor: {score} / {quiz.length}</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/history")}>
            <Text style={styles.buttonText}>See History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => router.replace("/")}> 
            <Text style={styles.buttonText}>Go Back to Homepage</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Listening {index + 1}/{quiz.length}</Text>
          <TouchableOpacity style={styles.speakButton} onPress={readText}>
            <Text style={styles.speakButtonText}>Listen Again</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={setAnswer}
            placeholder="Type what you can hear"
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          <Text style={styles.score}>Score: {score}</Text>
        </>
      )}
>>>>>>> 720cf9b (update)
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#1E1E1E",
=======
    backgroundColor: "#F8F9FA",
>>>>>>> 720cf9b (update)
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
<<<<<<< HEAD
    color: "#FFD700",
=======
    color: "#333",
>>>>>>> 720cf9b (update)
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  speakButton: {
<<<<<<< HEAD
    backgroundColor: "#444",
=======
    backgroundColor: "#E3F2FD",
>>>>>>> 720cf9b (update)
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  speakButtonText: {
<<<<<<< HEAD
    color: "#FFF",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#444",
    color: "#FFF",
=======
    color: "#0277BD",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#CCC",
    borderWidth: 1,
>>>>>>> 720cf9b (update)
    borderRadius: 8,
    padding: 12,
    width: "90%",
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
<<<<<<< HEAD
    backgroundColor: "#FFA500",
=======
    backgroundColor: "#42A5F5",
>>>>>>> 720cf9b (update)
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
    width: "90%",
    alignItems: "center",
  },
<<<<<<< HEAD
=======
  homeButton: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
  },
>>>>>>> 720cf9b (update)
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  score: {
<<<<<<< HEAD
    color: "#FFF",
=======
    color: "#333",
>>>>>>> 720cf9b (update)
    fontSize: 18,
    marginTop: 15,
  },
});
