import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.title}>Quiz Uygulaması</Text>
=======
      <Text style={styles.title}>dictly.</Text>
>>>>>>> 720cf9b (update)

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create")}
      >
<<<<<<< HEAD
        <Text style={styles.buttonText}>Quiz Yarat</Text>
=======
        <Text style={styles.buttonText}>Create Quiz</Text>
>>>>>>> 720cf9b (update)
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/history")}
      >
<<<<<<< HEAD
        <Text style={styles.buttonText}>Geçmiş</Text>
=======
        <Text style={styles.buttonText}>History</Text>
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
    backgroundColor: "#F9F9F9", // Açık tema arka planı
>>>>>>> 720cf9b (update)
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
<<<<<<< HEAD
    color: "#FFD700", // Altın rengi başlık
=======
    color: "#333", // Daha koyu başlık rengi
>>>>>>> 720cf9b (update)
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textTransform: "uppercase",
  },
  button: {
<<<<<<< HEAD
    backgroundColor: "#444",
=======
    backgroundColor: "#007AFF", // Modern mavi buton
>>>>>>> 720cf9b (update)
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
<<<<<<< HEAD
=======
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android gölge efekti
>>>>>>> 720cf9b (update)
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
