import { View, Text, Image, Alert } from "react-native";

import styles from "../styles/styles";
import ExerciseSet from "../components/Exercise/ExerciseSet";
import IconButton from "../components/ui/IconButton";
import { Colors } from "../constant/Color";
import { useState } from "react";
import AddRemove from "../components/Exercise/AddRemove";
import BottomNav from "../components/ui/BottomNav";
import { Images } from "../components/Exercise/ImgPath";
import { Divider } from "@rneui/themed";
import { Dimensions } from "react-native";

function Exercising({ navigation, route }) {
  const [sets, setSets] = useState([1]); // sets를 배열로 관리
  const { eng_name, title } = route.params;
  function addSetHandler() {
    if (sets.length < 5) {
      // sets 배열의 길이가 5 미만일 때만 세트를 추가
      setSets([...sets, sets.length + 1]); // sets 배열에 새로운 세트를 추가
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
          <View
            style={[
              styles.setContainer,
              {
                alignSelf: "center",
                width: windowWidth / 4,
                height: (windowWidth / 4 / 79) * 32,
                backgroundColor: "#767680",
                borderRadius: 16,
                // paddingHorizontal: 8,
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
          {sets.map((set) => (
            <ExerciseSet key={set} text={set} />
          ))}
        </View>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}

export default Exercising;
