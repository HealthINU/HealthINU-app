import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState, useEffect } from "react";
//https://www.npmjs.com/package/react-native-element-dropdown 사이트 참고
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constant/Color";
import IconButton from "../ui/IconButton";

function SplitExercise({ data, onSaveExerciseData, categoryNum, SplitCount}) {
    //const [value, setValue] = useState(null); // 선택한 운동
    const [values, setValues] = useState(Array(Categories).fill('')); // 초기 value 상태를 배열로 설정
    const [checkCategory, setCheckCategory] = useState([]); // 선택한 카테고리,겹침방지
    const [Categories, setCategories] = useState(1); //다른 카테고리 추가
    const limitCount = SplitCount;
    let num;
    if (categoryNum == 1) {
        num = "first_category";
    }else if (categoryNum == 2) {
        num = "second_category";
    }else if (categoryNum == 3) {
        num = "third_category";
    }else{
        num = "fourth_category";
    }
    // context에 저장된 카테고리들 가져와 checkCategory에 저장 / 이후 다른 index에 카테고리와 비교할 수 있게 된다.=============================
    useEffect(() => {
        console.log("선택된 운동:", checkCategory);
    }, [checkCategory]);

    //카테고리 중복체크
    const check_duplication_Category = () => {
        console.log("values크기:", values.length);
        console.log("values배열:", values);
        for (let i = 0; i < values.length; i++) {
            console.log("체크운동:", values[i]);
            //배열에 값들을 추가
            if (!checkCategory.includes(values[i])) {
                //setCheckCategory([...checkCategory, ...values]);
                //카테고리 지정 State에 저장
                // values.forEach(value => {
                //     onSaveExerciseData({
                //         exercise: value,
                //     });
                // });
                setCheckCategory([...checkCategory, values[i]]);
            } else {
                Alert.alert('중복', '이미 추가된 운동입니다.', [{
                    text: '확인',
                    onPress: () => {
                        setValues(''); // 입력된 값을 지움
                    }
                }]);
            }
        }
        // context로 카테고리 저장 필요================================================================================================
        onSaveExerciseData({
            [num]: values,
        });
    };
    const appendDropDown = () => {
        setCategories(Categories + 1);
        // 백엔드에 Splitcount를 가져와 각 index카테고리 합이 4이상이되지 않도록 제한해야함====================================================
        if (Categories+limitCount > 4) {
            Alert.alert('주의', '4을 초과할 수 없습니다.', [{
                text: '확인',
                onPress: () => {
                    setCategories(Categories);
                }
            }]);
        }
    };
    const reduceDropDown = () => {
        setCategories(Categories - 1);
        if (Categories <= 1) {
            Alert.alert('주의', '1 미만일 수 없습니다.', [{
                text: '확인',
                onPress: () => {
                    setCategories(1);
                }
            }]);
        }
    };
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Text style={styles1.selectedTextStyle}>{categoryNum}</Text>
            <View style={{ flexDirection: 'column' }}>
                {[...Array(Categories)].map((_, index) => (
                    <View key={index} style={{
                        flexDirection: 'row',
                        alignItems: 'center'
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
                            // placeholder={value ? value : "Categories"} //선택한값 or 선택된 값이 없을 때
                            // //search //Show or hide input search
                            // //searchPlaceholder="Search..." //둘이 한세트
                            // value={value}
                            // onChange={item => {
                            //     setValue(item.label);
                            // }}
                            placeholder={values[index] ? values[index] : "Categories"} // 각 Dropdown의 value를 사용
                            value={values[index]} // 각 Dropdown의 value를 사용
                            onChange={item => {
                                const newValues = [...values];
                                newValues[index] = item.label; // 선택된 Dropdown의 value만 변경
                                setValues(newValues);
                            }}
                            renderLeftIcon={() => (
                                <Ionicons name="walk-outline" color={Colors.white1} size={25} />
                            )}
                        />

                    </View>
                ))}
            </View>
            <IconButton
                icon={"checkmark"}
                color={Colors.white1}
                size={30}
                onPress={check_duplication_Category} // 클릭 시 값 저장. 저장된 데이터를 출력 , 값 저장되었는지 Test용
            />
            <IconButton
                icon={"add"}
                color={Colors.white1}
                size={30}
                onPress={appendDropDown} // 카테고리 추가
            />
            <IconButton
                icon={"remove"}
                color={Colors.white1}
                size={30}
                onPress={reduceDropDown} // 카태고리 삭제
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
        color: Colors.white1
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