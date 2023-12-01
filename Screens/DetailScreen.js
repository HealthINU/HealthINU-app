import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Button,
} from "react-native";
import styles from "../styles/styles";
//onPress={() => openURL(bench_press["url1"].link)}

export default function DetailScreen({ navigation }) {
  const openURL = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <Text style={styles1.title}>운동이름</Text>
      <TouchableOpacity style={{ margin: 10 }}>
        <Image
          source={require("../assets/exercise_picture/bench_press_machine.jpg")}
          style={{ width: 298, height: 235 }}
        />
      </TouchableOpacity>
      <Text style={styles1.detail}>벤치프레스 하는법...</Text>
    </View>
  );
}

const styles1 = StyleSheet.create({
  title: {
    fontSize: 64,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  detail: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
