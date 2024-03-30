import React from "react";
import { View, Text } from "react-native";

//  키, 몸무게, BMI 보여주는 컴포넌트
export default function MainProfileView({ user_info }) {
  const BMI = (
    user_info.user_weight /
    (user_info.user_height / 100) ** 2
  ).toFixed(2);

  return (
    <View
      style={{
        width: "auto",
        height: "272",
        flexDirection: "row",
        // justifyContent: "space-around",
        backgroundColor: "#1F1F1F",
        borderRadius: 16,
        marginHorizontal: 16,
        marginTop: 16,
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
        <View>
          <Text style={styles.redText}>Height</Text>
          <Text style={styles.text}>
            {user_info.user_height}
            <Text style={styles.grayText}> cm</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.greenText}>Weight</Text>
          <Text style={styles.text}>
            {user_info.user_weight}
            <Text style={styles.grayText}> kg</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.blueText}>BMI</Text>
          <Text style={styles.text}>{BMI}</Text>
        </View>
      </View>
    </View>
  );
}
