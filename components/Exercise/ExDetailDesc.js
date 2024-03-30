import React from "react";
import { View, Text, StyleSheet } from "react-native";

//  모달에서 운동 설명 출력하는 컴포넌트
const ExDetailDesc = ({ title, index, line, num }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
      }}
      key={`${title}${num}_${index}`}>
      {/* 인덱스 출력 */}
      <Text
        style={{
          ...styles1.modaltext,
          width: "auto",
          marginHorizontal: 16,
        }}>
        {index + 1}.
      </Text>
      {/* 설명 출력 */}
      <Text
        style={{
          ...styles1.modaltext,
          width: "auto",
          flexWrap: "wrap",
          flex: 1,
        }}>
        {line.split(". ")[1]}
        {"\n"}
      </Text>
    </View>
  );
};

const styles1 = StyleSheet.create({
  modaltext: {
    ...styles.text,
    fontSize: 13,

    borderRadius: 6,
  },
});

export default ExDetailDesc;
