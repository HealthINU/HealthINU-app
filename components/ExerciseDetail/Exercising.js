import { View, Text, Image, Alert } from "react-native";

import styles from "../../styles/styles";
import ExerciseSet from "./ExerciseSet";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constant/Color";
import { useState } from "react";
import AddRemove from "../ui/AddRemove";

function Exercising({ navigation }) {
  const [sets, setSets] = useState([1]); // sets를 배열로 관리

  function addSetHandler() {
    if (sets.length < 5) {
      // sets 배열의 길이가 5 미만일 때만 세트를 추가
      setSets([...sets, sets.length + 1]); // sets 배열에 새로운 세트를 추가
    } else {
      Alert.alert("추가 불가능!!", "세트는 5개까지만 추가 가능합니다");
    }
  }
  function removeSetHandler() {
    if (sets.length > 1) {
      // sets 배열의 길이가 1 이상일 때만 세트를 제거
      setSets(sets.slice(0, sets.length - 1)); // sets 배열에서 마지막 세트를 제거
    } else {
      Alert.alert("추가 불가능!!", "세트는 1개까지만 제거 가능합니다");
    }
  }
  //Main화면 돌아감
  function moveMain() {
    navigation.navigate("Main");
  }
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={require("../../assets/madong.png")} />
      <Text style={[styles.text, { marginBottom: 15 }]}>운동이름</Text>
      <View style={styles.setContainer}>
        <Text style={styles.text}>세트</Text>
        <Text style={styles.text}>회</Text>
        <Text style={styles.text}>완료</Text>
      </View>
      {/* sets 배열을 맵핑하여 ExerciseSet 컴포넌트를 생성*/}
      {sets.map((set) => (
        <ExerciseSet key={set} text={set} />
      ))}
      <View style={[styles.setContainer, { justifyContent: "center" }]}>
        <AddRemove
          text="세트 추가"
          Color={Colors.red1}
          onPress={addSetHandler}
          Button="add"
        />
        <AddRemove
          text="세트 삭제"
          Color={Colors.yellow1}
          onPress={removeSetHandler}
          Button="remove"
        />
      </View>
      <IconButton
        icon={"home-outline"}
        color={Colors.white1}
        size={50}
        onPress={moveMain}
      />
    </View>
  );
}

export default Exercising;
