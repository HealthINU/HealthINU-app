import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";

import { AuthContext } from "../util/auth-context";
import BottomNav from "../components/ui/BottomNav";
import MainProfileView from "../components/Main/MainProfileView";
import Button from "../components/ui/Button";

export default function MainScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const user_info = authCtx.info.user;

  //운동 데이터 예시(categories를 넣어서 나중에 분류화면 만들 예정)
  const [exerciseItems, setExerciseItems] = useState([
    {
      text: "test1",
      id: Math.random().toString(),
      detail: "운동에 대한 설명1",
    },
    {
      text: "test2",
      id: Math.random().toString(),
      detail: "운동에 대한 설명2",
    },
    {
      text: "test3",
      id: Math.random().toString(),
      detail: "운동에 대한 설명3",
    },
  ]);

  useEffect(() => {}, [authCtx.info.user]);

  return (
    <View style={{ ...styles.container }}>
      {/* HealthINU 텍스트와 이미지 들어가는 View */}
      <View style={styles.barContainer}>
        {/* HealthINU 텍스트 */}
        <Text style={{ ...styles.text, fontSize: 32, marginTop: 16 }}>
          HealthINU
        </Text>
        {/* 프로필 화면 이동 */}
      </View>

      {/* 키, 몸무게, BMI 보여주는 Component */}
      <MainProfileView user_info={user_info} />

      <Text
        style={[
          styles.text,
          { alignSelf: "flex-start", padding: 16, fontSize: 24 },
        ]}>
        Today Health
      </Text>

      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: "#1F1F1F",
            borderRadius: 16,
            marginHorizontal: 16,
            padding: 8,
            height: 192,
          }}>
          <FlatList
            data={exerciseItems}
            horizontal={true}
            renderItem={(itemData) => {
              return (
                <View>
                  <Image
                    source={require("../assets/madong.png")}
                    style={{
                      width: 128,
                      height: 128,
                      borderRadius: 16,
                      margin: 8,
                    }}
                  />
                  <Text
                    style={{
                      ...styles.text,
                      marginLeft: 8,
                    }}>
                    {itemData.item.text}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <Button
          onPress={() => {
            navigation.navigate("Rank");
          }}>
          랭킹 이동
        </Button>
      </View>

      <BottomNav navigation={navigation} />
      {/* 상단바 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
