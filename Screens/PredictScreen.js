import { useState, useContext, useRef } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { Button } from "@rneui/themed";

//  styles/styles.js에서 정의한 스타일을 불러옴
import styles from "../styles/styles";
import { exercise_list } from "../components/Camera/exercise_list";

export default function PredictScreen({ navigation, route }) {
  //  카메라 페이지에서 넘어온 파라미터 받아오기
  const result = route.params.data;

  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;

  //  가장 확률 높은 운동 이름
  const top_exercise = result[0]["name"];
  const isGarbage = top_exercise === "garbage";
  // 이동할 이름
  const title = exercise_list[top_exercise]["name"];
  //console.log("top_exercise : " + title);
  function moveExerciseSearch(name) {
    //console.log("가져올 운동 : " + name);
    navigation.navigate("ExerciseList", { title: name });
  }

  return (
    <View style={{ ...styles.container, justifyContent: "center" }}>
      {!isGarbage ? <Text style={styles.titletext}>이게 맞나요?</Text> : null}
      {!isGarbage ? (
        <Text style={{ ...styles.titletext, color: "#00ff00" }}>
          {exercise_list[top_exercise]["name"]}
        </Text>
      ) : (
        <Text
          style={{
            ...styles.titletext,
            color: "#00ff00",
            fontSize: 30,
            marginBottom: 16,
          }}
        >
          {exercise_list[top_exercise]["name"]}
        </Text>
      )}

      <Image
        source={exercise_list[top_exercise]["jpg"]}
        style={{ width: windowWidth, height: windowWidth }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {/* 카메라 페이지로 이동하는 버튼*/}
        <Button
          buttonStyle={{ ...styles.generalButton, marginTop: 16 }}
          titleStyle={styles.generalFont}
          onPress={() => navigation.navigate("Kamera")}
        >
          Retake?
        </Button>

        {/*해당 운동이 맞을 시*/}
        {isGarbage ? null : (
          <Button
            buttonStyle={{ ...styles.generalButton, marginTop: 16 }}
            titleStyle={styles.generalFont}
            title={top_exercise}
            onPress={() => moveExerciseSearch(title)}
          >
            Yes
          </Button>
        )}
      </View>
    </View>
  );
}
