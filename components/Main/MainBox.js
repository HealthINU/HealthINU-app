import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constant/Color";
import styles from "../../styles/styles";
import { ProgressChart } from "react-native-chart-kit";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";

import { apiFunction } from "../../util/api/api";

//  메인 화면의 4개 박스
export default function MainBox({ windowWidth, navigation, token }) {
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

  //  출석 정보
  const [attendance, setAttendance] = useState(null);
  //  출석 퀘스트 정보
  const [attendanceQuest, setAttendanceQuest] = useState(null);

  useEffect(() => {
    if (attendance !== null && attendanceQuest !== null) {
      return;
    }

    const fetchData = async () => {
      const data = await apiFunction(token, "get", "/info/attendance_day");
      const data2 = await apiFunction(token, "get", "/info/attendance_quest");
      setAttendance(data.data.data);
      setAttendanceQuest(data2.data.data);
    };

    fetchData();
  }, [attendance, attendanceQuest]);

  const a_rate = attendance ? attendance.attendance_rate / 100 : 0;
  const a_day = attendance ? attendance.attendance_day : 0;

  //  출석퀘스트 상태
  const atdBtnText = attendanceQuest?.quest_state;

  const attendance_que_click = async () => {
    if (atdBtnText === "미진행") {
      const res = await apiFunction(
        token,
        "get",
        "/info/accept_attendance_quest"
      );

      const data = await apiFunction(token, "get", "/info/attendance_quest");
      setAttendanceQuest(data.data.data);
    } else if (atdBtnText === "달성") {
      const res = await apiFunction(
        token,
        "get",
        "/info/accept_attendance_quest"
      );

      const data = await apiFunction(
        token,
        "get",
        "/info/finish_attendance_quest"
      );
      setAttendanceQuest(data.data.data);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: 32,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ ...style1.box }}>
              <Text style={[styles.text, style1.topLeftText]}>운동</Text>
              <ProgressChart
                data={{
                  data: [a_rate],
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
                }}
              >
                {a_day}
                <Text style={{ ...styles.grayText }}> 일째</Text>
              </Text>
            </View>
            <View
              style={{
                ...style1.box,
              }}
            >
              <Text style={[styles.text, style1.topLeftText]}>오늘의 운동</Text>
              <Text
                style={{
                  ...styles.text,
                  fontSize: 24,
                  textAlign: "center",
                  paddingBottom: 16,
                  position: "absolute",
                  alignSelf: "center",
                }}
              >
                레그 프레스
              </Text>
              <Text
                style={{
                  ...styles.text,
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: 64,
                }}
              >
                10<Text style={{ ...styles.grayText }}> kg</Text> x 10{" "}
                <Text style={{ ...styles.grayText }}> 회</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                ...style1.box,
              }}
            >
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
                }}
              >
                맞춤형 분할
              </Text>
            </View>
            <View
              style={{
                ...style1.box,
              }}
            >
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
                }}
              >
                랭킹
              </Text>
            </View>
          </View>
          {/* before % after */}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.gray2,
          marginTop: 8,
          width: "auto",
          borderRadius: 16,
          marginHorizontal: 16,
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "50%",
              // alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View>
              <Text style={styles.grayText}>출석퀘스트</Text>
              <Text style={styles.text}>
                {attendanceQuest
                  ? attendanceQuest.Quest.quest_description
                  : "로딩중"}
              </Text>
            </View>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Button
              style={{
                paddingHorizontal: 16,
                marginTop: 0,
                marginBottom: 0,
              }}
              onPress={attendance_que_click}
            >
              {atdBtnText}
            </Button>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.gray2,
          marginVertical: 8,
          padding: 16,
          width: "auto",
          borderRadius: 16,
          marginHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...styles.text, alignSelf: "center" }}>
            Before & After
          </Text>
          {/* <IconButton
            icon={"analytics-outline"}
            color={Colors.white1}
            size={(windowWidth - 48) / 2 / 2 / 2}
            onPress={() => {
              navigation.navigate("BodyHistory");
            }}
          /> */}
          <View>
            <Button
              style={{ paddingHorizontal: 16, marginTop: 0, marginBottom: 0 }}
              onPress={() => {
                navigation.navigate("BodyHistory");
              }}
            >
              기록 보기
            </Button>
          </View>
        </View>
      </View>
    </>
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
