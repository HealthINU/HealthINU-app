import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import styles from "../styles/styles";
import { Camera } from "expo-camera";

import IconButton from "../components/ui/IconButton";
import { Colors } from "../constant/Color";

import { AuthContext } from "../util/auth-context";

export default function MainScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const user_info = authCtx.info.user;

  //운동 데이터 예시(categories를 넣어서 나중에 분류화면 만들 예정)
  const [exerciseItems, setExerciseItems] = useState([
    {
      text: "test1",
      id: Math.random().toString(),
      detail: "운동에 대한 설명1",
    },
    {
      text: "test2",
      id: Math.random().toString(),
      detail: "운동에 대한 설명2",
    },
    {
      text: "test3",
      id: Math.random().toString(),
      detail: "운동에 대한 설명3",
    },
  ]);

  function moveProfile() {
    navigation.navigate("Profile");
  }
  function moveExerciseList() {
    navigation.navigate("ExerciseSearch");
  }
  // 운동 테스트 화면 이동(임시)
  function moveExercising() {
    navigation.navigate("Exercising");
  }

  async function moveCamera() {
    await Camera.requestCameraPermissionsAsync();
    navigation.navigate("Kamera");
  }

  useEffect(() => {}, [authCtx.info.user]);

  return (
    <View style={{ ...styles.container }}>
      {/* HealthINU 텍스트와 이미지 들어가는 View */}
      <View style={styles.barContainer}>
        {/* HealthINU 텍스트 */}
        <Text style={styles.text}>HealthINU</Text>
        {/* 프로필 화면 이동 */}
      </View>

      {/* 프로필 사진, 이름, 레벨, 키, 몸무게, BMI */}
      <View
        style={{
          width: 350,
          height: 272,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#1F1F1F",
          borderRadius: 32,
          padding: 8,
        }}
      >
        {/* 프로필 사진 */}
        <Image
          source={require("../assets/sample_avatar.png")}
          style={{ width: 150, height: "100%", borderRadius: 32 }}
        />
        <View
          style={{
            justifyContent: "space-around",
            padding: 16,
            alignItems: "center",
          }}
        >
          {/* 이름, 레벨, 키, 몸무게, BMI */}
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>{user_info.user_name}</Text>
            <Text style={styles.grayText}>nickname</Text>
          </View>
          {/* <Text style={styles.text}>Lv. {user_info.user_level}</Text> */}
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>{user_info.user_height}cm</Text>
            <Text style={styles.grayText}>Height</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>{user_info.user_weight}kg</Text>
            <Text style={styles.grayText}>Weight</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>22.02</Text>
            <Text style={styles.grayText}>BMI</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#1F1F1F",
          borderRadius: 32,
          marginTop: 16,
          width: "100%",
          padding: 8,
        }}
      >
        <Text
          style={[
            styles.text,
            { color: Colors.green2, padding: 16, fontSize: 24 },
          ]}
        >
          Today Health
        </Text>
        <FlatList
          data={exerciseItems}
          horizontal={true}
          renderItem={(itemData) => {
            return (
              <View style={{ marginLeft: 15 }}>
                <Image
                  source={require("../assets/madong.png")}
                  style={{ width: 177, height: 144, borderRadius: 32 }}
                />
                <Text style={{ ...styles.text, padding: 6 }}>
                  {itemData.item.text}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          justifyContent: "space-around",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/*
        카메라 페이지로 가는 버튼
        누르면 카메라 권한 요청
      */}
        <IconButton
          icon={"camera-outline"}
          color={Colors.white1}
          size={50}
          onPress={moveCamera}
        />
        {/*
        운동리스트 검색칸으로 이동
         */}
        <IconButton
          icon={"walk-outline"}
          color={Colors.white1}
          size={50}
          onPress={moveExerciseList}
        />
        {/*
        운동 테스트 칸 이동
         */}
        <IconButton
          icon={"walk"}
          color={Colors.white1}
          size={50}
          onPress={moveExercising}
        />
        <IconButton
          icon={"person-circle-outline"}
          color={Colors.white1}
          size={30}
          onPress={moveProfile}
        />
      </View>
      {/* 상단바 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
