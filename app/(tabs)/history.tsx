import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

export default function HistoryScreen() {
  const [history, setHistory] = useState<{ level: string; score: number; date: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        const storedHistory = JSON.parse((await AsyncStorage.getItem("quizHistory")) || "[]");
        setHistory(storedHistory.reverse()); // En son yapılan quiz en üste gelsin
      };

      fetchHistory();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📜 Geçmiş Quizler</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.level}>{item.level.toUpperCase()}</Text>
            <Text style={styles.score}>Skor: {item.score}</Text>
            <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // Koyu arka plan
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#FFD700", // Altın sarısı vurgulu başlık
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Android için gölge efekti
  },
  level: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFA500", // Turuncu vurgulu level ismi
  },
  score: {
    fontSize: 16,
    color: "#FFF",
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: "#BBB",
    marginTop: 5,
  },
});
