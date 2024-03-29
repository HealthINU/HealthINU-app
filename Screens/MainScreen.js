import { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";

import { AuthContext } from "../util/auth-context";
import BottomNav from "../components/ui/BottomNav";
import MainProfileView from "../components/Main/MainProfileView";

//  기기 크기 가져오기 위한 라이브러리
import { Dimensions } from "react-native";

import { ProgressChart } from "react-native-chart-kit";
import IconButton from "../components/ui/IconButton";

export default function MainScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const user_info = authCtx.info.user;

  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: Colors.gray2,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: Colors.gray2,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    useShadowColorFromDataset: false,
  };

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

      <View
        style={{
          flex: 1,
          marginTop: 32,
        }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                backgroundColor: Colors.gray2,
                borderRadius: 16,
                height: (windowWidth - 48) / 2,
                width: (windowWidth - 48) / 2,
                margin: 8,
                justifyContent: "center",
              }}>
              <Text
                style={{
                  ...styles.text,
                  fontSize: 13,
                  textAlign: "center",
                  position: "absolute",
                  top: 8,
                  left: 8,
                }}>
                운동
              </Text>
              <ProgressChart
                data={{
                  data: [0.1],
                }}
                width={128}
                height={128}
                strokeWidth={8}
                radius={48}
                chartConfig={chartConfig}
                hideLegend={false}
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  left: windowWidth / 4 - 64,
                }}
              />
              <Text
                style={{
                  ...styles.text,
                  fontSize: 32,
                  textAlign: "center",
                  position: "absolute",
                  alignSelf: "center",
                }}>
                3<Text style={{ ...styles.grayText }}> 일째</Text>
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.gray2,
                borderRadius: 16,
                height: (windowWidth - 48) / 2,
                width: (windowWidth - 48) / 2,
                margin: 8,
                justifyContent: "center",
              }}>
              <Text
                style={{
                  ...styles.text,
                  textAlign: "center",
                  position: "absolute",
                  fontSize: 13,
                  top: 8,
                  left: 8,
                }}>
                오늘의 운동
              </Text>
              <Text
                style={{
                  ...styles.text,
                  fontSize: 24,
                  textAlign: "center",
                  paddingBottom: 16,
                  position: "absolute",
                  alignSelf: "center",
                }}>
                레그 프레스
              </Text>
              <Text
                style={{
                  ...styles.text,
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: 64,
                }}>
                10<Text style={{ ...styles.grayText }}> kg</Text> x 10{" "}
                <Text style={{ ...styles.grayText }}> 회</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                backgroundColor: Colors.gray2,
                borderRadius: 16,
                height: (windowWidth - 48) / 2,
                width: (windowWidth - 48) / 2,
                margin: 8,
                justifyContent: "center",
              }}>
              <IconButton
                icon={"grid"}
                color={Colors.white1}
                size={(windowWidth - 48) / 2 / 2}
                onPress={() => {
                  navigation.navigate("ExerciseList");
                }}
              />
              <Text
                style={{
                  ...styles.text,
                  fontSize: 16,
                  textAlign: "center",
                }}>
                맞춤형 분할
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.gray2,
                borderRadius: 16,
                height: (windowWidth - 48) / 2,
                width: (windowWidth - 48) / 2,
                margin: 8,
                justifyContent: "center",
              }}>
              <IconButton
                icon={"cellular"}
                color={Colors.white1}
                size={(windowWidth - 48) / 2 / 2}
                onPress={() => {
                  navigation.navigate("Rank");
                }}
              />
              <Text
                style={{
                  ...styles.text,
                  fontSize: 16,
                  textAlign: "center",
                }}>
                랭킹
              </Text>
            </View>
          </View>
        </View>
      </View>

      <BottomNav navigation={navigation} />
      {/* 상단바 밝게 */}
      <StatusBar style="light" />
    </View>
  );
}
