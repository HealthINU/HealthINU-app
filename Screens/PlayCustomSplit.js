import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useState, useContext, useEffect } from "react";
import { Dimensions } from "react-native";

import styles from "../styles/styles";
import BottomNav from "../components/ui/BottomNav";
import { AuthContext } from "../util/auth-context";
import { Colors } from "../constant/Color";
import { apiFunction } from "../util/api/api";

import RecordComponent from "../components/Exercise/RecordComponent";
import IconButton from "../components/ui/IconButton";

function PlayCustomSplit({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const authCtx = useContext(AuthContext);
  const equipment = authCtx.info.equipment;
  //const division_exercise = authCtx.info.division_exercise;

  //운동 데이터 예시(categories를 넣어서 나중에 분류화면 만들 예정)
  const [exerciseItems, setExerciseItems] = useState(null);
  //북마크 저장 변수
  const [isMark, setIsMark] = useState(false);
  //const [exerciseItems, setExerciseItems] = useState(division_exercise);
  //console.log(exerciseItems);

  //운동 데이터 제목 변수
  const [titleExercise, setTitleExercise] = useState(null);
  //운동 데이터 category 변수
  const [category, setCategory] = useState(null);
  //운동 이미지 변수
  const [exerciseImage, setExerciseImage] = useState(null);
  //운동 영어 이름 변수
  const [engName, setEngName] = useState(null);
  const [equip_num, setEquip_num] = useState(null);

  // 현재 선택된 운동 아이템 상태 변수
  const [currentItemSelected, setCurrentItemSelected] = useState(null);

  useEffect(() => {
    if (exerciseItems) return;

    const fetchData = async () => {
      const data = await apiFunction(
        authCtx.token,
        "POST",
        "/info/division_exercise",
        { isMark: isMark }
      );
      setExerciseItems(data.data.data);
    };
    fetchData();
  }, [isMark]);
  
  //console.log(exerciseItems);
  // 운동리스트에서 북마크된 운동들만 보여주는 함수
  async function showOnlyBookmarked() {
    setIsMark(!isMark); // isMark 상태를 반전시킵니다.
    const data = await apiFunction(
      authCtx.token,
      "POST",
      "/info/division_exercise",
      { isMark: isMark }
    );
    setExerciseItems(data.data.data);
  }
  return (
    <View style={{ ...styles.listContainer, height: "auto" }}>
      {!exerciseItems ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={Colors.gray2} />
        </View>
      ) : (
        <>

          <View style={{ justifyContent: 'center', alignItems: "center", flexDirection: "row" }}>
            <Text style={{ ...styles.titletext, fontSize: 25 }}>
              맞춤형 분할운동
            </Text>
          </View>
          <View style={{ flexDirection: 'row-reverse', alignItems: "center", paddingHorizontal:30 }}>
            <IconButton
              icon={"heart-sharp"}
              color={Colors.white1}
              size={32}
              onPress={showOnlyBookmarked}
            />
          </View>
          {/*운동리스트*/}
          <View style={{ flex: 1 }}>
            <FlatList
              data={exerciseItems}
              renderItem={(itemData) => {
                console.log('체크');
                console.log(isMark);
                console.log(itemData);
                // return (
                //   <View>
                //     <RecordComponent
                //       text={!isMark ? itemData.item.equipment_name : itemData.item.Equipment.equipment_name}
                //       id={!isMark ? itemData.item.equipment_num : itemData.item.Equipment.equipment_num}
                //       eng_name={!isMark ? itemData.item.equipment_eng : itemData.item.Equipment.equipment_eng}
                //       category={!isMark ? itemData.item.equipment_category : itemData.item.Equipment.equipment_category}
                //       equipment_num={!isMark ? itemData.item.equipment_num : itemData.item.Equipment.equipment_num}
                //       onPress={() => {
                //         handleItemClick(!isMark ? itemData.item : itemData.item.Equipment); 
                //       }}
                //       navigation={navigation}
                //     />
                //   </View>
                // );
                return (
                  <View>
                    <RecordComponent
                      text={itemData.item.equipment_name}
                      id={itemData.item.equipment_num}
                      eng_name={itemData.item.equipment_eng}
                      category={itemData.item.equipment_category}
                      equipment_num={itemData.item.equipment_num}
                      onPress={() => {
                        handleItemClick(itemData.item); 
                      }}
                      navigation={navigation}
                    />
                  </View>
                );
              }}
            />
          </View>
        </>
      )}
      <BottomNav navigation={navigation} />
    </View>
  );
}

export default PlayCustomSplit;
