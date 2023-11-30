import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import styles from "../styles/styles";
import axios from "axios";
import { Camera } from "expo-camera";

export default function MainScreen({ navigation }) {
  return (
    <View style={{ ...styles.container }}>
      {/* HealthINU 텍스트와 이미지 들어가는 View */}
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        {/* HealthINU 텍스트 */}
        <Text style={styles.text}>HealthINU</Text>
        <Image
          source={require("../assets/madong.png")}
          style={{ width: 32, height: 32, borderRadius: 10 }}
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

      {/* 운동 카테고리 */}
      <View
        style={{
          width: "100%",
          height: 99,
          marginTop: 8,
        }}
      >
        <ScrollView style={{ height: "100%" }} horizontal={true}>
          <View style={{}}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="요가"
              />
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="필라테스"
              />
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="기구없이"
              />
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="하체"
              />
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="상체"
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="다이어트"
              />
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="체력강화"
              />
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="유산소"
              />
              <Button
                buttonStyle={styles.generalButton}
                titleStyle={styles.generalFont}
                title="복근"
              />
            </View>
          </View>
        </ScrollView>
      </View>

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
        {/* 카메라 아이콘 */}
        <Image
          source={require("../assets/camera.png")}
          style={{ width: 48, height: 48, tintColor: "#ffffff" }}
        />
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
