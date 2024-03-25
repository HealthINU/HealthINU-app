import { useState, useContext } from "react";
import { View, Text, FlatList } from "react-native";

import { Colors } from "../../constant/Color";
import ExerciseItem from "./ExerciseItem";
import IconButton from "../ui/IconButton";
import styles from "../../styles/styles";
import ExerciseDetail from "./ExerciseDetail";
import { AuthContext } from "../../util/auth-context";

function ExerciseSearch({ navigation, route }) {
  //카메라에서 이 화면으로 이동하는데 여기 title에 값이 전달
  const title = route.params?.title || "";
  console.log("가져와진 운동 : " + title);
  const authCtx = useContext(AuthContext);
  const equipment = authCtx.info.equipment;

  //운동 데이터 예시(categories를 넣어서 나중에 분류화면 만들 예정)
  const [exerciseItems, setExerciseItems] = useState(equipment);
  //모달 여는 용도 변수
  const [modalIsVisible, setModalIsVisible] = useState(false);
  //운동 데이터 설명 변수1(모달로 전달)
  const [selectedExercise1, setSelectedExercise1] = useState(null);
  //운동 데이터 설명 변수2(모달로 전달)
  const [selectedExercise2, setSelectedExercise2] = useState(null);
  //운동 데이터 제목 변수(모달로 전달)
  const [titleExercise, setTitleExercise] = useState(null);
  //운동 데이터 category 변수(모달로 전달)
  const [category, setCategory] = useState(null);
  //운동 이미지 변수(모달로 전달)
  const [exerciseImage, setExerciseImage] = useState(null);
  //운동 영어 이름 변수(모달로 전달)
  const [engName, setEngName] = useState(null);

  //모달 열기 함수
  function startAddFoalHandler(detail) {
    setSelectedExercise1(detail.equipment_description1);
    setSelectedExercise2(detail.equipment_description2);
    setTitleExercise(detail.equipment_name);
    setCategory(detail.equipment_category);
    setEngName(detail.equipment_eng);

    setModalIsVisible(true);
  }
  //운동 아이템 클릭 시 실행될 함수
  function handleItemClick(item) {
    startAddFoalHandler(item);
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
            {
              // 카메라 바로이동 버튼 (해결중)-----------------------------
              /*카메라 인식후 이동한 경우 -> 이거 해결시 카메라 클릭후 바로나옴*/
            }
            // if (itemData.item.equipment_name === title) {
            //   startAddFoalHandler(itemData.item);
            // }
            return (
              <View>
                <ExerciseItem
                  text={itemData.item.equipment_name}
                  id={itemData.item.equipment_num}
                  eng_name={itemData.item.equipment_eng}
                  category={itemData.item.equipment_category}
                  onPress={() => {
                    handleItemClick(itemData.item);
                  }}
                />
                <ExerciseDetail
                  visible={modalIsVisible}
                  onCancel={endAddFoalHandler}
                  description1={selectedExercise1}
                  description2={selectedExercise2}
                  title={titleExercise}
                  eng_name={engName}
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
