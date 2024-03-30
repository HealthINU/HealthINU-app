import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constant/Color";
import styles from "../../styles/styles";
import { ProgressChart } from "react-native-chart-kit";
import IconButton from "../ui/IconButton";

//  메인 화면의 4개 박스
export default function MainBox({ windowWidth, navigation }) {
  //  메인 화면 원 그래프 설정
  const chartConfig = {
    backgroundGradientFrom: Colors.gray2,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: Colors.gray2,
    backgroundGradientToOpacity: 0,
    //  이게 색상 조절
    color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
    useShadowColorFromDataset: false,
  };

  const style1 = createStyles(windowWidth);

  return (
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
          <View style={{ ...style1.box }}>
            <Text style={[styles.text, style1.topLeftText]}>운동</Text>
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
              ...style1.box,
            }}>
            <Text style={[styles.text, style1.topLeftText]}>오늘의 운동</Text>
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
              ...style1.box,
            }}>
            <IconButton
              icon={"grid"}
              color={Colors.white1}
              size={(windowWidth - 48) / 2 / 2}
              onPress={() => {
                navigation.navigate("CustumSplit");
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
              ...style1.box,
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
  );
}

const createStyles = (windowWidth) =>
  StyleSheet.create({
    box: {
      backgroundColor: Colors.gray2,
      borderRadius: 16,
      height: (windowWidth - 48) / 2,
      width: (windowWidth - 48) / 2,
      margin: 8,
      justifyContent: "center",
    },
    topLeftText: {
      fontSize: 13,
      textAlign: "center",
      position: "absolute",
      top: 8,
      left: 8,
    },
  });
