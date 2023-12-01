import { useState } from "react";
import { StatusBar } from "expo-status-bar";

//  그라데이션 배경을 위한 라이브러리
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Button, ButtonGroup, withTheme, Textrn } from "@rneui/themed";
//  styles/styles.js에서 정의한 스타일을 불러옴
import styles from "../styles/styles";

export default function SigninScreen({ navigation }) {
  const [id, setId] = useState(null);
  const [pw, setPw] = useState(null);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#000000",
      }}
    >
      {/* gif 배경이미지 */}
      <ImageBackground
        source={require("../assets/gym1.gif")}
        style={{ width: "100%", height: 205 }}
      >
        {/* 그라데이션 배경 */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,1.0)"]}
          style={{ width: "100%", height: "100%" }}
        />
        {/* HealthINU 텍스트 */}
        <Text style={styles.title}>HealthINU</Text>
      </ImageBackground>

      {/* Sign in 텍스트 */}
      <Text style={styles.subtitle}>Sign in</Text>
      {/* 아이디, 비밀번호 입력창 */}
      <View style={styles.inputStart}>
        {/* 아이디 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888888"
          onChangeText={(e) => setId(e)}
        />
        {/* 비밀번호 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888888"
          onChangeText={(e) => setPw(e)}
        />
      </View>
      {/* 로그인 버튼 */}
      {/* 기능 구현 아직 안 함*/}
      <Button
        title="SIGN IN"
        buttonStyle={styles.signButton}
        titleStyle={styles.generalFont}
        containerStyle={styles.signContainer}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />

      <View style={styles.choiceContainer}>
        {/* 아래 두 개는 SIGN IN, SIGN UP 텍스트들 */}
        <Text
          style={{
            ...styles.text,
            borderColor: "#007aff",
            borderBottomWidth: 2,
            fontSize: 14,
          }}
        >
          SIGN IN
        </Text>
        <Text
          style={{
            ...styles.text,
            borderColor: "#007aff",
            fontSize: 14,
          }}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          SIGN UP
        </Text>
      </View>
      {/* 메인 화면으로 이동하는 버튼 */}
      <Button
        title="Main"
        onPress={() =>
          navigation.navigate("MainStack", {
            screen: "Main",
            initial: false,
          })
        }
      />
      {/* 배경이 검정이므로 상단바 스타일 밝게 */}
      <StatusBar style="light" />
    </ScrollView>
  );
}
