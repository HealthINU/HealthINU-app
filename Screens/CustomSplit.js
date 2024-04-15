import { View, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";
import IconButton from "../components/ui/IconButton";
import BottomNav from "../components/ui/BottomNav";
import SplitExercise from "../components/Exercise/SplitExercise";
function CustumSplit({ navigation }) {
  const [splitCount, setSplitCount] = useState(1); // 입력된 수를 상태로 관리
  const [inputValue, setInputValue] = useState(''); // 입력된 값을 상태로 관리

  const [savedData, setSavedData] = useState([]); // 저장된 데이터를 상태로 관리


  const data = [ //item 값들의 예시
    { label: '벤치 프레스', value: '1' }, 
    { label: '체스트 프레스', value: '2' },
    { label: '펙 덱 플라이', value: '3' },
    { label: '랫 풀 다운', value: '4' },
    { label: '숄더 프레스', value: '5' },
    { label: '레그 익스텐션', value: '6' },
    { label: '힙 어덕션', value: '7' },
    { label: '레그 프레스', value: '8' },
];

// 해당 코드를 통해 savedData를 백엔드에 보내게 할 예정
const handleSaveData = () => {
  console.log('Split Count:', splitCount);
  console.log('Input Value:', inputValue);
  //console.log('Saved Data:', savedData);
  savedData.forEach((item, index) => {
    console.log(`운동명${index + 1}:`, item.exercise);
    console.log(`운동 횟수${index + 1}:`, item.count);
  });
};

const handleSaveExerciseData = (exerciseData) => {
  setSavedData([...savedData, exerciseData]);
};
  return (
    <View style={[styles.container]}>
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}>
        <TextInput
          placeholder="Split?"
          placeholderTextColor={Colors.gray1}
          style={styles1.textinput}
          keyboardType="numeric"
          value={inputValue} // 입력된 값을 상태로 설정
          onChangeText={(text) => {
            setInputValue(text); // 입력된 값을 상태로 업데이트
          }}
          onEndEditing={() => {
            let count = parseInt(inputValue) || 1; // 숫자로 변환하고, 숫자가 아니면 1로 처리
            if (count > 3) {
              Alert.alert('주의', '분할수는 3을 초과할 수 없습니다.', [{
                text: '확인',
                onPress: () => {
                  setInputValue(''); // 입력된 값을 지움
                }
              }]);
              return;
            }
            setSplitCount(count);
          }}
        />
        {[...Array(splitCount)].map((_, index) => (
          <SplitExercise key={index} data={data} onSaveExerciseData={handleSaveExerciseData}/> // 최대 3개의 SplitExercise 렌더링
        ))}
        <IconButton
              icon={"checkmark"}
              color={Colors.white1}
              size={30}
              onPress={handleSaveData} // 클릭 시 저장된 데이터를 출력
            />
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
}

export default CustumSplit;

const styles1 = StyleSheet.create({
  textinput: {
    margin: 16,
    height: 50,
    width: 50,
    borderColor: Colors.gray1,
    borderWidth: 0.5,
    color: Colors.white1,
    textAlign: 'center'
  }
});