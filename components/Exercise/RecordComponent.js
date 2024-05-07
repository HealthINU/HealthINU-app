import { StyleSheet, View, Text, Alert, Image, TextInput } from "react-native";
import { useState, useContext } from "react";
import { Dimensions } from "react-native";
import { AuthContext } from "../../util/auth-context";
import { apiFunction } from "../../util/api/api";
import { Divider } from "@rneui/themed";
import { Colors } from "../../constant/Color";
import IconButton from "../ui/IconButton";
import { Images } from "./ImgPath";

import ExerciseSet from "./ExerciseSet";
import Button from "../ui/Button";
import AddRemove from "./AddRemove";
import styles from "../../styles/styles";


//ExerciseRecordScreen.js의 코드 복사
function RecordComponent({ id,
    text,
    onPress,
    category,
    eng_name,
    navigation,
    bookmark,
    BookmarkStatus,
    equipment_num, }) {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const size = 15;


    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const [sets, setSets] = useState([{ weight: 0, count: 0 }]); // sets를 배열로 관리
    console.log(sets);

    function addSetHandler() {
        if (sets.length < 5) {
            // sets 배열의 길이가 5 미만일 때만 세트를 추가
            setSets([...sets, { weight: 0, count: 0 }]); // sets 배열에 새로운 세트를 추가
        } else {
            Alert.alert("추가 불가능!!", "세트는 5개까지만 추가 가능합니다");
        }
    }
    function removeSetHandler() {
        if (sets.length > 1) {
            // sets 배열의 길이가 1 이상일 때만 세트를 제거
            setSets(sets.slice(0, sets.length - 1)); // sets 배열에서 마지막 세트를 제거
        } else {
            Alert.alert("추가 불가능!!", "세트는 1개까지만 제거 가능합니다");
        }
    }

    function getDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return year + "-" + month + "-" + day;
    }

    async function addRecord() {
        let setLength = 0;

        try {
            const promises = sets.map(async (item, index) => {
                //  횟수 x 무게가 0이 아닐 때만 기록 추가
                const volume = item.weight * item.count;
                if (volume != 0 && isNaN(volume) === false) {
                    const data = {
                        record_date: getDate(),
                        equipment_num: equipment_num,
                        record_count: item.count,
                        record_weight: item.weight,
                    };

                    console.log(data);

                    const res = await apiFunction(token, "POST", "/info/record", data);
                    setLength = setLength + 1;
                    console.log(data);
                    console.log(setLength)
                }
            });

            await Promise.all(promises);
            console.log("debug")
        } catch (error) {
            Alert.alert("기록 추가 실패", "다시 시도해주세요.");
        } finally {
            console.log(`${setLength}개의 기록이 추가되었습니다.`);
            if (setLength !== 0) {
                //  갱신된 기록 가져옴
                const new_record = await apiFunction(token, "GET", "/info/record");
                //  context에 갱신
                authCtx.info_dispatch({ type: "setRecord", payload: new_record.data });
                Alert.alert("기록이 추가되었습니다.");
            }
            else
                Alert.alert("기록 추가 실패", "최소 한 개 이상 기록을 추가해주세요.");
        }
    }

    return (
        <View style={styles1.exerciseItem}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 8,
                            marginLeft: 8,
                        }}>
                        <Image
                            source={Images[eng_name]}
                            style={{ width: 64, height: 64, borderRadius: 16 }}
                        />
                        <View>
                            <Text style={styles1.exerciseText}>{text}</Text>
                            <Text style={{ ...styles1.exerciseText, color: Colors.gray1 }}>
                                {category}
                            </Text>
                            {/* 플러스 마이너스 버튼 */}
                            <View style={
                                {
                                    flexDirection: "row",
                                    width: windowWidth / 4,
                                    height: windowHeight / 20,
                                    backgroundColor: "#767680",
                                    borderRadius: 16,

                                }
                            }>
                                <AddRemove
                                    text=""
                                    Color={Colors.white1}
                                    onPress={addSetHandler}
                                    Button="add"
                                    size={size}
                                />
                                <Divider
                                    inset={false}
                                    insetType="middle"
                                    color={Colors.white1}
                                    orientation="vertical"
                                    style={{ paddingVertical: 5 }}
                                />
                                <AddRemove
                                    text=""
                                    Color={Colors.white1}
                                    onPress={removeSetHandler}
                                    Button="remove"
                                    size={size}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width: "50%",
                    }}>
                    <View
                        style={{
                            ...styles.setContainer,
                            width: "100%",
                            justifyContent: "space-around",
                        }}>
                        <Text style={styles.text}>무게</Text>
                        <Text style={styles.text}>회</Text>
                        
                    </View>
                    {/* sets 배열을 맵핑하여 ExerciseSet 컴포넌트를 생성*/}
                    {sets.map((item, index) => (
                        <ExerciseSet key={index} index={index} setSets={setSets} />
                    ))}
                    <IconButton 
                        icon={"checkmark"}
                        color={Colors.white1}
                        size={15}
                        onPress={addRecord}/>
                </View>
            </View>
        </View>
    );
}
const styles1 = StyleSheet.create({
    exerciseItem: {
        margin: 8,
        borderRadius: 16,
        backgroundColor: Colors.gray2,
    },
    pressedItem: {
        opacity: 0.5,
    },
    exerciseText: {
        color: "white",
        padding: 8,
    },
});

export default RecordComponent;