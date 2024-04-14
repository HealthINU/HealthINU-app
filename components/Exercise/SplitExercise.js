import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
//https://www.npmjs.com/package/react-native-element-dropdown 사이트 참고
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constant/Color";
function SplitExercise() {
    const [value, setValue] = useState(null);
    const data = [
        { label: '벤치 프레스', value: '1' },
        { label: '체스트 프레스', value: '2' },
        { label: '펙 덱 플라이', value: '3' },
        { label: '랫 풀 다운', value: '4' },
        { label: '숄더 프레스', value: '5' },
        { label: '레그 익스텐션', value: '6' },
        { label: '힙 어덕션', value: '7' },
        { label: '레그 프레스', value: '8' },
    ];
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
                    setValue(item.value);
                }}
                renderLeftIcon={() => (
                    <Ionicons name="walk-outline" color={Colors.white1} size={25} />
                )}
            />
            <TextInput
                placeholder="횟수 입력"
                placeholderTextColor={Colors.gray1}
                style={styles1.textinput}
                keyboardType="numeric"
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