import { useContext } from "react";

import { StatusBar } from "expo-status-bar";
import { Text, View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import styles from "../styles/styles";

import { AuthContext } from "../util/auth-context";
//  하단바 import
import BottomNav from "../components/ui/BottomNav";
//  키, 몸무게, BMi 보여주는 Component import
import MainProfileView from "../components/Main/MainProfileView";

//  기기 크기 가져오기 위한 라이브러리
import { Dimensions } from "react-native";
import MainBox from "../components/Main/MainBox";

import { apiFunction } from "../util/api/api";

function MainScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const user_info = authCtx.info.user;
  console.log(authCtx.token);

  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {}, [authCtx.info.user]);
  console.log(user_info);

  return (
    <View style={{ ...styles.container }}>
      {/* HealthINU 텍스트와 이미지 들어가는 View */}
      <View style={styles.barContainer}>
        {/* HealthINU 텍스트 */}
        <Text style={{ ...styles.text, fontSize: 32, marginTop: 16 }}>
          HealthINU
        </Text>
      </View>

      {/* 키, 몸무게, BMI 보여주는 Component */}
      <MainProfileView user_info={user_info} />

      {/* 메인 화면의 4개 박스 */}
      <MainBox
        windowWidth={windowWidth}
        navigation={navigation}
        token={authCtx.token}
      />

      {/* 하단바 */}
      <BottomNav navigation={navigation} />

      {/* 상단바 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}

export default MainScreen;
