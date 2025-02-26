
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryScreen() {
  const [history, setHistory] = useState<{ level: string; score: number; date: string; language: string }[]>([]);

  const getFlagEmoji = (language: string) => {
    switch (language) {
      case "de":
        return "🇩🇪"; // Almanya
      case "en":
        return "🇬🇧"; // İngiltere
      case "fr":
        return "🇫🇷"; // Fransa
      case "es":
        return "🇪🇸"; // İspanya
      default:
        return "🌍"; // Varsayılan dünya emojisi
    }
  };


  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        const storedHistory = JSON.parse((await AsyncStorage.getItem("quizHistory")) || "[]");

        setHistory(storedHistory.reverse()); // Show the latest quizzes first

      };

      fetchHistory();
    }, [])
  );


  const deleteHistoryItem = async (index : number) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);
    setHistory(updatedHistory);
    await AsyncStorage.setItem("quizHistory", JSON.stringify(updatedHistory.reverse()));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📜 Quiz History</Text>
      <FlatList
        data={history}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
           
            <Text style={styles.language}>{getFlagEmoji(item.language)}</Text>
            <Text style={styles.level}>{item.level}</Text>
            <Text style={styles.score}>Score: {item.score}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteHistoryItem(index)}>
              <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
          </View>
        )}
        keyExtractor={(_: any, index: number) => index.toString()}


      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9", // Light theme background

    padding: 20,
  },
  title: {
    textAlign: "center",

    color: "#333", // Darker title for contrast

    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  card: {
    backgroundColor: "#FFF", // White card for contrast

    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",

    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android shadow effect
    borderWidth: 1,
    borderColor: "#E0E0E0", // Soft border for a modern look
    alignItems: "center", // İçeriği yatayda ortala
    justifyContent: "center", // İçeriği dikeyde ortala

  },
  level: {
    fontSize: 18,
    fontWeight: "bold",

    color: "#007AFF", // Blue highlight for level
    textAlign: "center",
  },
  language: {
    fontSize: 20,
    marginTop: 5,
    textAlign: "center",
  },
  score: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
});


