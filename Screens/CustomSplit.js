import { View, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";
import BottomNav from "../components/ui/BottomNav";
import SplitExercise from "../components/Exercise/SplitExercise";
function CustumSplit({ navigation }) {
  const [splitCount, setSplitCount] = useState(1); // 입력된 수를 상태로 관리
  const [inputValue, setInputValue] = useState(''); // 입력된 값을 상태로 관리
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
          <SplitExercise key={index} /> // 최대 3개의 SplitExercise 렌더링
        ))}
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
