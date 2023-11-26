import { useState, useEffect, useRef } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { Button } from "@rneui/themed";
//  styles/styles.js에서 정의한 스타일을 불러옴
import styles from "../styles/styles";

//  테스트용 데이터
//  assets/exercise_picture 폴더에 있는 사진들 경로와 운동 이름
const exercise_list = {
  bench_press_machine: {
    name: "벤치 프레스",
    jpg: require("../assets/exercise_picture/bench_press_machine.jpg"),
  },
  leg_extension_machine: {
    name: "레그 익스텐션",
    jpg: require("../assets/exercise_picture/leg_extension_machine.jpg"),
  },
  lat_pull_down_machine: {
    name: "랫 풀 다운",
    jpg: require("../assets/exercise_picture/lat_pull_down_machine.jpg"),
  },
};

export default function PredictScreen({ navigation, route }) {
  //  카메라 페이지에서 넘어온 파라미터 받아오기
  const result = route.params.data;

  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;
  //  폰 세로 길이
  const windowHeight = Dimensions.get("window").height;

  //  가장 확률 높은 운동 이름
  const top_exercise = result[0]["name"];

  console.log();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>이건가요?</Text>
      <Text style={styles.text}>{exercise_list[top_exercise]["name"]}</Text>
      <Image
        source={exercise_list[top_exercise]["jpg"]}
        style={{ width: 300, height: 300 }}
      />
      {/* 카메라 페이지로 이동하는 버튼*/}
      <Button onPress={() => navigation.navigate("Kamera")}>Retake?</Button>
    </View>
  );
}
