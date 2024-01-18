import { useState } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import Button from "../ui/Button";
//  styles/styles.js에서 정의한 스타일을 불러옴
import styles from "../../styles/styles";
import Input from "./Input";

export default function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  //네비게이션 사용 변수
  const navigation = useNavigation();

  //useState
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredId, setEnteredId] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");

  //입력오류 변수,적용보류(오류 생길시 해당 칸 스타일 추가방식)
  const {
    email: emailIsInvalid,
    id: idIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    name: nameIsInValid,
  } = credentialsInvalid;

  //입력된 값들 저장하는 함수
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "id":
        setEnteredId(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "name":
        setEnteredName(enteredValue);
        break;
    }
  }

  // 입력한 Text 상태 적용 함수(아직 적용안시킴)
  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      id: enteredId,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      name: enteredName,
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
    <View style={{ flex: 1 }}>
      <View style={styles.inputStart}>
        {/* 아이디 입력창 */}
        <Input
          label="Username"
          onUpdateValue={updateInputValueHandler.bind(this, "id")}
          value={enteredId}
          keyboardType="email-address"
        />
        {/*Email 입력창*/}
        {!isLogin && (
          <Input
            label="Email"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
          />
        )}

        {/* 비밀번호 입력창 */}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          value={enteredPassword}
          keyboardType="email-address"
          secure
        />
        {/*비밀번호 확인, 이름, 성별 */}
        {!isLogin && (
          <>
            <Input
              label="Password Confirm"
              onUpdateValue={updateInputValueHandler.bind(
                this,
                "confirmPassword"
              )}
              value={enteredConfirmPassword}
              keyboardType="email-address"
              secure
            />

            <Input
              label="Name"
              onUpdateValue={updateInputValueHandler.bind(this, "name")}
              value={enteredName}
              keyboardType="email-address"
            />
          </>
        )}
      </View>

      {/* 로그인 버튼 */}
      {/* 기능 구현 아직 안 함*/}
      <Button>{isLogin ? "SIGN IN" : "SIGN UP"}</Button>

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
      {/* 메인 화면으로 이동하는 버튼 */}
      <Button
        onPress={() =>
          navigation.navigate("MainStack", {
            screen: "Main",
            initial: false,
          })
        }
      >
        Main
      </Button>
      {/* 배경이 검정이므로 상단바 스타일 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
