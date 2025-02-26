import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CreateQuizScreen() {
  const router = useRouter();
  const [level, setLevel] = useState("A1");
  const [language, setLanguage] = useState("de"); // Default: German

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Level</Text>

      <View style={styles.buttonContainer}>
        {["A2", "B1", "B2", "C1"].map((item) => (

          <TouchableOpacity
            key={item}
            style={[styles.button, level === item && styles.selectedButton]}
            onPress={() => setLevel(item)}
          >
            <Text style={[styles.buttonText, level === item && styles.selectedButtonText]}>

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

            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}

        onPress={() => router.push({ pathname: "/quiz", params: { level, language } })}
      >
        <Text style={styles.startButtonText}>Start Quiz</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",

    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {

    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,

  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {

    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,

    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {

    color: "#333",

    fontSize: 18,
    fontWeight: "bold",
  },
  selectedButton: {

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

    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  startButtonText: {

    color: "#FFF",

    fontSize: 18,
    fontWeight: "bold",
  },
});
