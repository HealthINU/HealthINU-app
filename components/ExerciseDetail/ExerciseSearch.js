import { useState } from "react";
import { View, Text, FlatList } from "react-native";

import { Colors } from "../../constant/Color";
import ExerciseItem from "./ExerciseItem";
import IconButton from "../ui/IconButton";
import styles from "../../styles/styles";
import ExerciseDetail from "./ExerciseDetail";

function ExerciseSearch({ navigation }) {
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
  //모달 여는 용도 변수
  const [modalIsVisible, setModalIsVisible] = useState(false);
  //운동 데이터 설명 변수(모달로 전달)
  const [selectedExercise, setSelectedExercise] = useState(null);

  //모달 열기 함수
  function startAddFoalHandler(detail) {
    setSelectedExercise(detail);
    setModalIsVisible(true);
  }

  //모달 닫기 함수
  function endAddFoalHandler() {
    setModalIsVisible(false);
  }
  //Main화면 돌아감
  function moveMain() {
    navigation.navigate("Main");
  }
  return (
    <View style={styles.listContainer}>
      {/*상단바*/}
      <View style={styles.barContainer}>
        <IconButton
          icon={"home-outline"}
          color={Colors.white1}
          size={30}
          onPress={moveMain}
        />
        <Text style={styles.text}>HealthINU</Text>
      </View>

      {/*운동리스트*/}
      <View>
        <FlatList
          data={exerciseItems}
          renderItem={(itemData) => {
            return (
              <View>
                <ExerciseItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onPress={() => startAddFoalHandler(itemData.item.detail)}
                />
                <ExerciseDetail
                  visible={modalIsVisible}
                  onCancel={endAddFoalHandler}
                  description={selectedExercise}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default ExerciseSearch;
