import { useState } from "react";
import { Alert, ScrollView, Text, ImageBackground } from "react-native";
//  그라데이션 배경을 위한 라이브러리
import { LinearGradient } from "expo-linear-gradient";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    id: false,
    password: false,
    confirmPassword: false,
    name: false,
  });

  // 입력 오류 없는지 확인
  function submitHandler(credentials) {
    let { email, id, password, confirmPassword, name } = credentials;

    email = email.trim();
    id = id.trim();
    password = password.trim();
    name = name.trim();

    const emailIsValid = email.includes("@");
    const idIsValid = id.length > 8;
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;
    const nameIsValid = name.length > 6;

    if (
      !emailIsValid ||
      !idIsValid ||
      !passwordIsValid ||
      !nameIsValid ||
      (!isLogin && !passwordsAreEqual)
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
    onAuthenticate({ email, password, id, name });
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
        source={require("../../assets/gym1.gif")}
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
    </ScrollView>
  );
}

export default AuthContent;
