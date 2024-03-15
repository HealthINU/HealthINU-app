import { useState, useContext } from "react";
import { View, Text, FlatList } from "react-native";

import { Colors } from "../../constant/Color";
import ExerciseItem from "./ExerciseItem";
import IconButton from "../ui/IconButton";
import styles from "../../styles/styles";
import ExerciseDetail from "./ExerciseDetail";
import { AuthContext } from "../../util/auth-context";

function ExerciseSearch({ navigation }) {
  const authCtx = useContext(AuthContext);
  const equipment = authCtx.info.equipment;

  //운동 데이터 예시(categories를 넣어서 나중에 분류화면 만들 예정)
  const [exerciseItems, setExerciseItems] = useState(equipment);
  //모달 여는 용도 변수
  const [modalIsVisible, setModalIsVisible] = useState(false);
  //운동 데이터 설명 변수(모달로 전달)
  const [selectedExercise, setSelectedExercise] = useState(null);
  //운동 데이터 제목 변수(모달로 전달)
  const [titleExercise, setTitleExercise] = useState(null);
  //운동 데이터 category 변수(모달로 전달)
  const [category, setCategory] = useState(null);
  //운동 이미지 변수(모달로 전달)
  const [exerciseImage, setExerciseImage] = useState(null);

  //모달 열기 함수
  function startAddFoalHandler(detail) {
    setSelectedExercise(detail.equipment_description);
    setTitleExercise(detail.equipment_name);
    setCategory(detail.equipment_category);

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
      <View style={{ flex: 1 }}>
        <FlatList
          data={exerciseItems}
          renderItem={(itemData) => {
            return (
              <View>
                <ExerciseItem
                  text={itemData.item.equipment_name}
                  id={itemData.item.equipment_num}
                  category={itemData.item.equipment_category}
                  onPress={() => {
                    startAddFoalHandler(itemData.item);
                  }}
                />
                <ExerciseDetail
                  visible={modalIsVisible}
                  onCancel={endAddFoalHandler}
                  description={selectedExercise}
                  title={titleExercise}
                  category={category}
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
