import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function CreateQuizScreen() {
  const router = useRouter();
  const [level, setLevel] = useState("kolay");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seviye Seç</Text>
      <Button title="Kolay" onPress={() => setLevel("kolay")} />
      <Button title="Orta" onPress={() => setLevel("orta")} />
      <Button title="Zor" onPress={() => setLevel("zor")} />
      <Button title="Quiz Başlat" onPress={() => router.push({ pathname: "/quiz", params: { level } })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
