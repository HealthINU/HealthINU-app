import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../styles/styles";
import axios from "axios";

const Stack = createStackNavigator();

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>INU님 안녕하세요</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Kamera")}
      >
        <Text>go to gall</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
