import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CreateQuizScreen() {
  const router = useRouter();
<<<<<<< HEAD
  const [level, setLevel] = useState("kolay");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seviye Seç</Text>

      <View style={styles.buttonContainer}>
        {["leicht", "mittel", "schwer"].map((item) => (
=======
  const [level, setLevel] = useState("A1");
  const [language, setLanguage] = useState("de"); // Default: German

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Level</Text>

      <View style={styles.buttonContainer}>
        {["A2", "B1", "B2", "C1"].map((item) => (
>>>>>>> 720cf9b (update)
          <TouchableOpacity
            key={item}
            style={[styles.button, level === item && styles.selectedButton]}
            onPress={() => setLevel(item)}
          >
            <Text style={[styles.buttonText, level === item && styles.selectedButtonText]}>
<<<<<<< HEAD
              {item.charAt(0).toUpperCase() + item.slice(1)}
=======
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Select Language</Text>

      <View style={styles.buttonContainer}>
        {[
          { code: "de", name: "German" },
          { code: "en", name: "English" },
          { code: "fr", name: "French" },
          { code: "es", name: "Spanish" },
        ].map((item) => (
          <TouchableOpacity
            key={item.code}
            style={[styles.button, language === item.code && styles.selectedButton]}
            onPress={() => setLanguage(item.code)}
          >
            <Text style={[styles.buttonText, language === item.code && styles.selectedButtonText]}>
              {item.name}
>>>>>>> 720cf9b (update)
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
<<<<<<< HEAD
        onPress={() => router.push({ pathname: "/quiz", params: { level } })}
      >
        <Text style={styles.startButtonText}>Quiz Başlat</Text>
=======
        onPress={() => router.push({ pathname: "/quiz", params: { level, language } })}
      >
        <Text style={styles.startButtonText}>Start Quiz</Text>
>>>>>>> 720cf9b (update)
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#1E1E1E", // Koyu tema arka planı
=======
    backgroundColor: "#F5F5F5",
>>>>>>> 720cf9b (update)
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
<<<<<<< HEAD
    color: "#FFD700",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
=======
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
>>>>>>> 720cf9b (update)
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
<<<<<<< HEAD
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
=======
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
>>>>>>> 720cf9b (update)
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
<<<<<<< HEAD
    color: "#FFF",
=======
    color: "#333",
>>>>>>> 720cf9b (update)
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedButton: {
<<<<<<< HEAD
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
=======
    backgroundColor: "#4CAF50",
  },
  selectedButtonText: {
    color: "#FFF",
  },
  startButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
>>>>>>> 720cf9b (update)
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  startButtonText: {
<<<<<<< HEAD
    color: "#1E1E1E",
=======
    color: "#FFF",
>>>>>>> 720cf9b (update)
    fontSize: 18,
    fontWeight: "bold",
  },
});
