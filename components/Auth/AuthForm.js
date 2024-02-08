import { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

//  styles/styles.js에서 정의한 스타일을 불러옴
import styles from "../../styles/styles";
import Input from "./Input";
import Button from "../ui/Button";

export default function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
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

  // 입력한 Text 상태 적용 함수
  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      id: enteredId,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      name: enteredName,
    });
    //입력값 잘 보내졌는지 확인용
    console.log(
      enteredEmail,
      enteredId,
      enteredPassword,
      enteredConfirmPassword,
      enteredName + "전송완료"
    );
  }

  return (
    <View>
      <View style={styles.inputStart}>
        {/*Email 입력창*/}
        <Input
          label="Email"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
        />
        {/* 아이디 입력창 */}
        {!isLogin && (
          <Input
            label="id"
            onUpdateValue={updateInputValueHandler.bind(this, "id")}
            value={enteredId}
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
      <Button onPress={submitHandler}>{isLogin ? "SIGN IN" : "SIGN UP"}</Button>
      {/* 배경이 검정이므로 상단바 스타일 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
