import { View, Text, Image, Alert } from "react-native";

import styles from "../styles/styles";
import ExerciseSet from "../components/Exercise/ExerciseSet";
import { Colors } from "../constant/Color";
import { useState, useContext } from "react";
import AddRemove from "../components/Exercise/AddRemove";
import BottomNav from "../components/ui/BottomNav";
import { Images } from "../components/Exercise/ImgPath";
import { Divider, SocialIcon } from "@rneui/themed";
import { Dimensions } from "react-native";
import Button from "../components/ui/Button";
import { AuthContext } from "../util/auth-context";
import { apiFunction } from "../util/api/api";

function Exercising({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [sets, setSets] = useState([{ weight: 0, count: 0 }]); // sets를 배열로 관리
  console.log(sets);
  const { eng_name, title, equipment_num } = route.params;
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
  //Main화면 돌아감
  function moveMain() {
    navigation.navigate("Main");
  }

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return year + "-" + month + "-" + day;
  }

  function addRecord() {
    let setLength = 0;

    try {
      sets.map((item, index) => {
        //  횟수 x 무게가 0이 아닐 때만 기록 추가
        const volume = item.weight * item.count;
        if (volume != 0 && isNaN(volume) === false) {
          const data = {
            record_date: getDate(),
            equipment_num: equipment_num,
            record_count: item.count,
            record_weight: item.weight,
          };

          const res = apiFunction(token, "POST", "/info/record", data);
          setLength = setLength + 1;
        }
      });
    } catch (error) {
      Alert.alert("기록 추가 실패", "다시 시도해주세요.");
    } finally {
      console.log(`${setLength}개의 기록이 추가되었습니다.`);
      if (setLength !== 0) Alert.alert("기록이 추가되었습니다.");
      else
        Alert.alert("기록 추가 실패", "최소 한 개 이상 기록을 추가해주세요.");
    }
  }

  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          alignContent: "center",
          margin: 10,
          width: "100%",
          paddingHorizontal: 16,
        }}>
        {/* 기구 이미지 */}
        <Image
          style={{
            ...styles.Image,
            borderRadius: 16,
            width: windowWidth / 4,
            height: windowWidth / 4,
            marginTop: 32,
          }}
          source={Images[eng_name]}
        />
        {/* 기구 이름 */}
        <Text style={[styles.text]}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
        }}>
        <View
          style={{
            width: "25%",
            height: "25%",
          }}>
          {/* 플러스 마이너스 버튼 */}
          <View
            style={[
              styles.setContainer,
              {
                alignSelf: "center",
                width: windowWidth / 4,
                height: (windowWidth / 4 / 79) * 32,
                backgroundColor: "#767680",
                borderRadius: 16,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              },
            ]}>
            <AddRemove
              text=""
              Color={Colors.white1}
              onPress={addSetHandler}
              Button="add"
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
            />
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
          <Button onPress={addRecord}>기록 추가</Button>
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}

export default Exercising;
