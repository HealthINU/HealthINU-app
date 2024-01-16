import { useState } from "react";
import { StatusBar } from "expo-status-bar";

//  그라데이션 배경을 위한 라이브러리
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, TextInput, ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import { Button } from "@rneui/themed";
//  styles/styles.js에서 정의한 스타일을 불러옴
import styles from "../../styles/styles";
import { useNavigation } from "@react-navigation/native";

export default function SigninScreen({ isLogin }) {
  const navigation = useNavigation();

  const [id, setId] = useState(null);
  const [pw, setPw] = useState(null);

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

      <View style={styles.inputStart}>
        {/* 아이디 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888888"
          onChangeText={(e) => setId(e)}
        />
        {/*Email 입력창*/}
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888888"
          />
        )}
        {/* 비밀번호 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888888"
          onChangeText={(e) => setPw(e)}
        />
        {/*비밀번호 확인, 이름, 성별 */}
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password Confirm"
              placeholderTextColor="#888888"
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888888"
            />
          </>
        )}
      </View>

      {/* 로그인 버튼 */}
      {/* 기능 구현 아직 안 함*/}

      <Button
        title={isLogin ? "SIGN IN" : "SIGN UP"}
        buttonStyle={styles.signButton}
        titleStyle={styles.generalFont}
        containerStyle={styles.signContainer}
      />

      <View style={styles.choiceContainer}>
        {/* 아래 두 개는 SIGN IN, SIGN UP 텍스트들 */}
        <Text
          style={{
            ...styles.text,
            borderColor: "#007aff",
            borderBottomWidth: isLogin ? 2 : undefined,
            fontSize: 14,
          }}
          onPress={switchAuthModeHandler}
        >
          SIGN IN
        </Text>
        <Text
          style={{
            ...styles.text,
            borderColor: "#007aff",
            borderBottomWidth: !isLogin ? 2 : undefined,
            fontSize: 14,
          }}
          onPress={switchAuthModeHandler}
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
