import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import { API_KEY } from '@env';


export default function ListeningQuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

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


  const readText = () => {
    if (quiz[index]) {
      Speech.speak(quiz[index], {

        language: language === "de" ? "de-DE" : language === "en" ? "en-US" : "es-ES",

        rate: 0.9,
      });
    }
  };


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

    }
  };

  return (
    <View style={styles.container}>

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F8F9FA",

    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {

    color: "#333",

    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  speakButton: {

    backgroundColor: "#E3F2FD",

    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  speakButtonText: {

    color: "#0277BD",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#CCC",
    borderWidth: 1,

    borderRadius: 8,
    padding: 12,
    width: "90%",
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
  },
  button: {

    backgroundColor: "#42A5F5",

    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
    width: "90%",
    alignItems: "center",
  },

  homeButton: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  score: {

    color: "#333",

    fontSize: 18,
    marginTop: 15,
  },
});
