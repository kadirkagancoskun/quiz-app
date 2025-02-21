import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CreateQuizScreen() {
  const router = useRouter();
  const [level, setLevel] = useState("kolay");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seviye Seç</Text>

      <View style={styles.buttonContainer}>
        {["leicht", "mittel", "schwer"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.button, level === item && styles.selectedButton]}
            onPress={() => setLevel(item)}
          >
            <Text style={[styles.buttonText, level === item && styles.selectedButtonText]}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push({ pathname: "/quiz", params: { level } })}
      >
        <Text style={styles.startButtonText}>Quiz Başlat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // Koyu tema arka planı
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedButton: {
    backgroundColor: "#FFA500",
  },
  selectedButtonText: {
    color: "#1E1E1E",
  },
  startButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  startButtonText: {
    color: "#1E1E1E",
    fontSize: 18,
    fontWeight: "bold",
  },
});
