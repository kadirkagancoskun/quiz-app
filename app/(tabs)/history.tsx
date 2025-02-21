import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

export default function HistoryScreen() {
  const [history, setHistory] = useState<{ level: string; score: number; date: string }[]>([]);

  useFocusEffect(() => {
    const loadHistory = async () => {
      const storedHistory = JSON.parse((await AsyncStorage.getItem("quizHistory")) || "[]");
      setHistory(storedHistory);
    };
    loadHistory();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Geçmiş Quizler</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <Text style={{ color: "white" }}>
            {item.level} - Skor: {item.score} - {new Date(item.date).toLocaleString()}
          </Text>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
