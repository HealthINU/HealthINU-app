import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { Button, ButtonGroup, withTheme, Textrn } from "@rneui/themed";
import styles from "../styles/styles";

export default function PredictScreen({ navigation }) {
  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>이건가요?</Text>
      <Text style={styles.text}>벤치 프레스</Text>
      <Image
        source={require("../assets/gym1.gif")}
        style={{ width: 300, height: 300 }}
      />
      <Button onPress={() => navigation.navigate("Kamera")}>Retake?</Button>
    </View>
  );
}
