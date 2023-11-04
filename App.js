import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Kamera from "./Kamera";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Health INU Main page</Text>
      <StatusBar style="auto" />
      <Kamera></Kamera>
      <Button title="Picturing" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
});
