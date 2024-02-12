import { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Input from "../components/Auth/Input";

import { Colors } from "../constant/Color";
import styles from "../styles/styles";

import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import ToggleSwitch from "../components/ui/ToggleSwitch";
import { AuthContext } from "../util/auth-context";
import { editProfile } from "../util/local-auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function ChangeProfile({ navigation }) {
  const authCtx = useContext(AuthContext); // Context 호출 변수

  const [isAuthenticating, setIsAuthenticating] = useState(false); // 로딩상태관리

  //useState
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredHeight, setEnteredHeight] = useState("");
  const [enteredWeight, setEnteredWeight] = useState("");

  //입력된 값들 저장하는 함수
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "UserName":
        setEnteredUserName(enteredValue);
        break;
      case "Age":
        setEnteredAge(enteredValue);
        break;
      case "Height":
        setEnteredHeight(enteredValue);
        break;
      case "Weight":
        setEnteredWeight(enteredValue);
        break;
    }
  }

  // 데이터 정보 최신화
  async function editProfileHandler({
    user_name,
    user_height,
    user_weight,
    age,
  }) {
    setIsAuthenticating(true);
    try {
      const result = await editProfile(
        user_name,
        user_height,
        user_weight,
        age
      ); //local-auth.js 참고 return한 data 받음
      if (result.status == 200) {
        Alert.alert("인증성공", "프로필 수정 완료");
        authCtx.authenticate(result.data.token);
      } else {
        Alert.alert("인증실패", "입력값의 오류입니다.다시 시도해주세요");
        setIsAuthenticating(false); // 프로필 변경 완료후 다시 false로
      }
    } catch (error) {
      Alert.alert("인증실패", "Undefined error");
      setIsAuthenticating(false); // 프로필 변경 완료후 다시 false로
    }
  }
  //프로필 화면
  function profile() {
    navigation.navigate("Profile");
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="프로필 변경 중..." />;
  }
  return (
    <View style={styles.container}>
      <View style={{ margin: 50 }}>
        <Text style={styles.titletext}>프로필 수정</Text>
      </View>
      <View style={[styles.inputStart, { marginBottom: 20 }]}>
        {/*<Input label="Name" />*/}
        <Input
          label="UserName"
          onUpdateValue={updateInputValueHandler.bind(this, "UserName")}
          value={enteredUserName}
        />
        <Input
          label="Age"
          keyboardType="decimal-pad"
          onUpdateValue={updateInputValueHandler.bind(this, "Age")}
          value={enteredAge}
        />
        <View style={styles1.input}>
          <Text style={[{ fontSize: 14, color: Colors.gray1 }]}>
            GenderName
          </Text>
          <View style={{ marginLeft: 100 }}>
            <ToggleSwitch />
          </View>
        </View>
        <Input
          label="Height"
          keyboardType="decimal-pad"
          onUpdateValue={updateInputValueHandler.bind(this, "Height")}
          value={enteredHeight}
        />
        <Input
          label="Weight"
          keyboardType="decimal-pad"
          onUpdateValue={updateInputValueHandler.bind(this, "Weight")}
          value={enteredWeight}
        />
      </View>
      <Button
        onPress={() =>
          editProfileHandler({
            user_name: enteredUserName,
            user_height: enteredHeight,
            user_weight: enteredWeight,
            age: enteredAge,
          })
        }
      >
        수정 완료
      </Button>
      <IconButton
        icon={"arrow-back-outline"}
        color={Colors.white1}
        size={30}
        onPress={profile}
      />
    </View>
  );
}

export default ChangeProfile;

const styles1 = StyleSheet.create({
  input: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#888888",
    padding: 10,
    alignItems: "center",
    height: 40, // 원하는 높이로 조정
  },
});
