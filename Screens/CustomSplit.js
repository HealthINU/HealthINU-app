import { View, TextInput, Alert } from "react-native";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";
import IconButton from "../components/ui/IconButton";
import BottomNav from "../components/ui/BottomNav";
import SplitExercise from "../components/Exercise/SplitExercise";
import { AuthContext } from "../util/auth-context";

import { apiFunction } from "../util/api/api";

function CustumSplit({ navigation }) {
  const authCtx = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("1"); // 입력된 값을 상태로 관리
  const [splitCount, setSplitCount] = useState(1); //  input value를 숫자로 변환한 값을 상태로 관리

  const [savedData, setSavedData] = useState({ division_count: 1 }); // 저장된 데이터를 상태로 관리
  const [sendData, setSendData] = useState([]); // 백엔드로 보낼 데이터를 상태로 관리 -> 백엔드 규격과 똑같이 맞춰놓음

  const data = [
    //item 값들의 예시
    { label: "가슴", value: "1" },
    { label: "어깨", value: "2" },
    { label: "등", value: "3" },
    { label: "하체", value: "4" },
  ];

  const categoryReturn = (categoryNum) => {
    if (categoryNum == 1) {
      num = "first_category";
    } else if (categoryNum == 2) {
      num = "second_category";
    } else if (categoryNum == 3) {
      num = "third_category";
    } else {
      num = "fourth_category";
    }
    return num;
  };

  // 해당 코드를 통해 savedData를 백엔드에 보내게 할 예정
  const handleSaveData = async () => {
    console.log("Send Data:", savedData);

    const exerList = [];

    for (let i = 1; i <= splitCount; i++) {
      if (
        !savedData[categoryReturn(i)] ||
        savedData[categoryReturn(i)].length == 0
      ) {
        Alert.alert("주의", "모든 카테고리를 선택해주세요", [
          {
            text: "확인",
            onPress: () => {},
          },
        ]);
        return;
      }

      exerList.push(...savedData[categoryReturn(i)]);
    }

    console.log(`exerList: ${exerList}`);

    //  exerList에 중복 요소 있으면 alert
    const set = new Set(exerList);

    console.log(`set.size: ${set.size}`);
    console.log(`exerList.length: ${exerList.length}`);
    if (set.size !== exerList.length) {
      Alert.alert("주의", "중복된 운동이 있습니다", [
        {
          text: "확인",
          onPress: () => {},
        },
      ]);
      return;
    }

    const fetchData = async () => {
      const data = await apiFunction(
        authCtx.token,
        "post",
        "/info/division",
        savedData
      );

      return data;
    };

    try {
      const data = await fetchData();
      if (data.status == 200) {
        Alert.alert("저장 완료", "저장이 완료되었습니다.", [
          {
            text: "확인",
            onPress: () => {},
          },
        ]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    //  전의 splitCount
    const preSaveSize = savedData.division_count;
    const maxCount = splitCount > preSaveSize ? splitCount : preSaveSize;
    const minCount = splitCount > preSaveSize ? preSaveSize : splitCount;

    for (let i = minCount + 1; i <= maxCount; i++) {
      savedData[categoryReturn(i)] = [];
    }

    setSavedData((prevSavedData) => {
      const data = {
        ...prevSavedData,
        division_count: splitCount,
      };

      return data;
    });
  }, [splitCount]);

  const handleSaveExerciseData = (exerciseData) => {
    //  first_category, second... , third... , fourth... 문자열로 변환
    const category = exerciseData.category;
    setSavedData((prevSavedData) => ({
      ...prevSavedData,
      [category]: exerciseData.values,
    }));
  };

  console.log(savedData);
  return (
    <View style={[styles.container]}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Split 운동을 몇개로 나눌지 입력 */}
        <TextInput
          placeholder="Split?"
          placeholderTextColor={Colors.gray1}
          style={styles.textinput}
          keyboardType="numeric"
          value={inputValue} // 입력된 값을 상태로 설정
          onChangeText={(text) => {
            setInputValue(text); // 입력된 값을 상태로 업데이트
          }}
          onEndEditing={() => {
            let count = parseInt(inputValue) || 1; // 숫자로 변환하고, 숫자가 아니면 1로 처리
            if (count > 4) {
              Alert.alert("주의", "분할수는 4을 초과할 수 없습니다.", [
                {
                  text: "확인",
                  onPress: () => {
                    setInputValue(""); // 입력된 값을 지움
                  },
                },
              ]);
              return;
            }
            setSplitCount(count);
          }}
        />
        {[...Array(splitCount)].map((_, index) => (
          <SplitExercise
            key={index}
            data={data}
            onSaveExerciseData={handleSaveExerciseData}
            categoryNum={index + 1}
            SplitCount={splitCount}
          /> // 최대 4개의 SplitExercise 렌더링
        ))}
        <IconButton
          icon={"checkmark"}
          color={Colors.white1}
          size={30}
          onPress={handleSaveData}
        />
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
}

export default CustumSplit;

