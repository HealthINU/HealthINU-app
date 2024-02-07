import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import styles from "../styles/styles";
import { Camera } from "expo-camera";

import IconButton from "../components/ui/IconButton";
import { Colors } from "../constant/Color";

export default function MainScreen({ navigation }) {
  function moveProfile() {
    navigation.navigate("Profile");
  }
  function moveExerciseList() {
    navigation.navigate("ExerciseSearch");
  }
  async function moveCamera() {
    await Camera.requestCameraPermissionsAsync();
    navigation.navigate("Kamera");
  }

  return (
    <View style={{ ...styles.container }}>
      {/* HealthINU 텍스트와 이미지 들어가는 View */}
      <View style={styles.barContainer}>
        {/* HealthINU 텍스트 */}
        <Text style={styles.text}>HealthINU</Text>
        {/* 프로필 화면 이동 */}
        <IconButton
          icon={"person-circle-outline"}
          color={Colors.white1}
          size={30}
          onPress={moveProfile}
        />
      </View>

      {/* 프로필 사진, 이름, 레벨, 키, 몸무게, BMI */}
      <View
        style={{
          width: 350,
          height: 272,
          flexDirection: "row",
          backgroundColor: "#1F1F1F",
          borderRadius: 32,
          padding: 8,
        }}
      >
        {/* 프로필 사진 */}
        <Image
          source={require("../assets/sample_avatar.png")}
          style={{ width: 154, height: "100%", borderRadius: 32 }}
        />
        <View
          style={{
            height: "100%",
            justifyContent: "space-around",
            padding: 16,
            alignItems: "flex-end",
          }}
        >
          {/* 이름, 레벨, 키, 몸무게, BMI */}
          <Text style={styles.text}>동근님 안녕하세요</Text>
          <Text style={styles.text}>Lv. 19</Text>
          <Text style={styles.text}>키 : 177cm</Text>
          <Text style={styles.text}>몸무게 : 69kg</Text>
          <Text style={styles.text}>BMI : 22.02</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
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
      </View>
      {/* 상단바 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
