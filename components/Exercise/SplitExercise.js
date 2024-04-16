import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
//https://www.npmjs.com/package/react-native-element-dropdown 사이트 참고
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constant/Color";
import IconButton from "../ui/IconButton";
function SplitExercise({data,onSaveExerciseData}) {
    const [value, setValue] = useState(null); // 선택한 운동
    const [exerciseCount, setExerciseCount] = useState('');
    const handleSaveData = () => {
        console.log("운동명:",  value);
        console.log("운동 횟수:", exerciseCount);
        onSaveExerciseData({ 
            exercise: value,
            count: exerciseCount
        });
      };
      
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'centers'
        }}>
            <Dropdown
                style={styles1.dropdown}
                placeholderStyle={styles1.placeholderStyle}
                selectedTextStyle={styles1.selectedTextStyle}
                inputSearchStyle={styles1.inputSearchStyle}
                iconStyle={styles1.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Training"
                //search //Show or hide input search
                //searchPlaceholder="Search..." //둘이 한세트
                value={value}
                onChange={item => {
                    setValue(item.label);
                }}
                
                renderLeftIcon={() => (
                    <Ionicons name="walk-outline" color={Colors.white1} size={25} />
                )}
            />
            {/* {<TextInput
                placeholder="횟수 입력"
                placeholderTextColor={Colors.gray1}
                style={styles1.textinput}
                keyboardType="numeric"
                value={exerciseCount}
                onChangeText={text => setExerciseCount(text)}
            />} */}
            <IconButton
              icon={"checkmark"}
              color={Colors.white1}
              size={30}
              onPress={handleSaveData} // 클릭 시 저장된 데이터를 출력 , 값 저장되었는지 Test용
            />
        </View>);
}

export default SplitExercise;

const styles1 = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: 150,
        borderBottomColor: Colors.gray1,
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colors.gray1
    },
    selectedTextStyle: {
        fontSize: 16,
        color: Colors.white1,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    textinput: {
        margin: 16,
        height: 50,
        borderBottomColor: Colors.gray1,
        borderBottomWidth: 0.5,
        margin: 16,
        color: Colors.white1,
        textAlign: 'center'
    }
});