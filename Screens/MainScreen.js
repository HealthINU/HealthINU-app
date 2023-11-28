import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../styles/styles";
import axios from "axios";
import { Camera } from "expo-camera";

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 이름 보여주는 Text */}
      <Text style={styles.text}>INU님 안녕하세요</Text>

      {/*
        카메라 페이지로 가는 버튼
        누르면 카메라 권한 요청
      */}
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={async () => {
          await Camera.requestCameraPermissionsAsync();
          navigation.navigate("Kamera");
        }}
      >
        <Text>go to gall</Text>
      </TouchableOpacity>

      {/* 화면 확인용 이동 버튼 -> 수정해야함 */}
      <View style={{ height: 10 }} />
      <Button
        title="Bench Detail"
        onPress={() => {
          navigation.navigate("BenchDetail");
        }}
      />
      

      {/* 상단바 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
