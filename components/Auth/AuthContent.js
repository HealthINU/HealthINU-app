import { useState } from "react";
import {
  Alert,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//  그라데이션 배경을 위한 라이브러리
import { LinearGradient } from "expo-linear-gradient";

import AuthForm from "./AuthForm";
import Button from "../ui/Button";
import GoogleButton from "./GoogleButton";

function AuthContent({ isLogin, onAuthenticate, onLocalAuth }) {
  //네비게이션 사용 변수
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    id: false,
    password: false,
    confirmPassword: false,
    name: false,
  });

  //전송받은 값 확인
  console.log(credentialsInvalid);
  // 입력 오류 없는지 확인
  function submitHandler(credentials) {
    let { email, id, password, confirmPassword, name } = credentials;

    email = email.trim();
    id = id.trim();
    password = password.trim();
    name = name.trim();

    const emailIsValid = email.includes("@");
    const idIsValid = id.length > 8; // id확인용, 보류
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const nameIsValid = name.length > 6; //유저명 확인용, 보류

    if (
      !idIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual) ||
      (!isLogin && !emailIsValid) ||
      (!isLogin && !nameIsValid)
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        id: !idIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        name: !nameIsValid,
      });
      return;
    }
    // onAuthenticate({ email, password, id, name });
    onLocalAuth({
      user_email: email,
      user_id: id,
      user_pw: password,
      user_name: name,
    });
  }

  // 회원가입 , 로그인 화면 변환 함수
  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.navigate("Signin");
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#000000",
      }}
    >
      {/* gif 배경이미지 */}
      <ImageBackground
        //source={require("../../assets/gym1.gif")}
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

      {/* Sign in,up 텍스트 */}
      {isLogin && <Text style={styles.subtitle}>Sign in</Text>}
      {!isLogin && <Text style={styles.subtitle}>Sign up</Text>}
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />

      <View style={styles.choiceContainer}>
        {/* 아래 두 개는 SIGN IN, SIGN UP 텍스트들 */}
        <Text
          style={{
            ...styles.choiceText,
            borderBottomWidth: isLogin ? 2 : undefined,
          }}
          onPress={switchAuthModeHandler}
        >
          SIGN IN
        </Text>
        <Text
          style={{
            ...styles.choiceText,
            borderBottomWidth: !isLogin ? 2 : undefined,
          }}
          onPress={switchAuthModeHandler}
        >
          SIGN UP
        </Text>
      </View>
      <GoogleButton />
    </ScrollView>
  );
}

export default AuthContent;
