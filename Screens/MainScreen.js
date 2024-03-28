import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";

import { AuthContext } from "../util/auth-context";
import BottomNav from "../components/ui/BottomNav";

export default function MainScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const user_info = authCtx.info.user;

  const BMI = (
    user_info.user_weight /
    (user_info.user_height / 100) ** 2
  ).toFixed(2);

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

      {/* 프로필 사진, 이름, 레벨, 키, 몸무게, BMI */}
      <View
        style={{
          width: "auto",
          height: "272",
          flexDirection: "row",
          // justifyContent: "space-around",
          backgroundColor: "#1F1F1F",
          borderRadius: 16,
          marginHorizontal: 16,
        }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 16,
            // alignItems: "center",
          }}>
          {/* 레벨, 키, 몸무게, BMI */}

          {/* <Text style={styles.text}>Lv. {user_info.user_level}</Text> */}
          <View>
            <Text style={styles.redText}>Height</Text>
            <Text style={styles.text}>{user_info.user_height}cm</Text>
          </View>
          <View>
            <Text style={styles.greenText}>Weight</Text>
            <Text style={styles.text}>{user_info.user_weight}kg</Text>
          </View>
          <View>
            <Text style={styles.blueText}>BMI</Text>
            <Text style={styles.text}>{BMI}</Text>
          </View>
        </View>
      </View>

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
      </View>

      <BottomNav navigation={navigation} />
      {/* 상단바 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
