import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>dictly.</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create")}
      >
        <Text style={styles.buttonText}>Create Quiz</Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/history")}
      >

        <Text style={styles.buttonText}>Geçmiş</Text>

        <Text style={styles.buttonText}>History</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,


    backgroundColor: "#F9F9F9", // Açık tema arka planı

    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {

    color: "#333", // Daha koyu başlık rengi

    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textTransform: "uppercase",
  },
  button: {

    backgroundColor: "#007AFF", // Modern mavi buton

    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android gölge efekti

  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
