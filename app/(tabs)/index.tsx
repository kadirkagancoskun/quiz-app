import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Uygulaması</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/create")}
      >
        <Text style={styles.buttonText}>Quiz Yarat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/history")}
      >
        <Text style={styles.buttonText}>Geçmiş</Text>
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
    color: "#FFD700", // Altın rengi başlık
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "#444",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
