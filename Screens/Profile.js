import { View, Text, Dimensions, StyleSheet, Image, Alert } from "react-native";
//Context import
import { useContext, useState } from "react";
import { AuthContext } from "../util/auth-context";

import IconButton from "../components/ui/IconButton";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";
//npx npm install react-native-calendars필요
import { Calendar } from "react-native-calendars";

//  폰 가로 길이
const windowWidth = Dimensions.get("window").width;
//  폰 세로 길이
const windowHeight = Dimensions.get("window").height;

function Profile({ navigation }) {
  const authCtx = useContext(AuthContext);
  //달력 표시 예제
  const [events, setEvents] = useState({
    "2024-02-15": {
      selected: true,
      marked: true,
      selectedColor: "blue",
      description1: "푸쉬업 10회",
      description2: "친업 20회",
    },
    "2024-02-16": {
      marked: true,
      dotColor: "red",
      activeOpacity: 0,
      description1: "레그톱 20회",
      description2: "윗몸 30회",
    },
  });
  //운동 설명
  const [exercise_des, setExercise_des] = useState();

  //예시 : 날짜 선택시 정보 알려줌
  const handleDayPress = (day) => {
    const date = day.dateString;
    const description = events[date]
      ? events[date].description1 + "   " + events[date].description2
      : "운동 정보가 없습니다.";
    setExercise_des(description);
    //Alert.alert(date, description);
  };

  //Main화면 돌아감
  function moveMain() {
    navigation.navigate("Main");
  }
  //프로필 수정화면
  function profileEdit() {
    navigation.navigate("ChangeProfile");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titletext}>Profile</Text>
      <View style={style1.profilecontainer}>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <Image
            source={require("../assets/madong.png")}
            style={style1.profileImage}
          />
          <View style={style1.name}>
            <Text style={[styles.text, { fontSize: 20 }]}>유동현</Text>
          </View>
        </View>
        <View style={{ flex: 7, marginTop: 10 }}>
          <Calendar
            style={{ width: "100%", height: "100%" }}
            markedDates={events}
            onDayPress={handleDayPress}
          />
        </View>
        <View style={{ flex: 1, marginTop: 10, marginBottom: 50 }}>
          <Text style={styles.text}>{exercise_des}</Text>
        </View>
      </View>
      <View style={styles.barContainer}>
        <IconButton
          icon={"home-outline"}
          color={Colors.white1}
          size={50}
          onPress={moveMain}
        />
        <IconButton
          icon={"log-out-outline"}
          color={Colors.white1}
          size={50}
          onPress={authCtx.logout}
        />
        <IconButton
          icon={"person-outline"}
          color={Colors.white1}
          size={50}
          onPress={profileEdit}
        />
      </View>
    </View>
  );
}

export default Profile;

const style1 = StyleSheet.create({
  profilecontainer: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    marginTop: 20,
    backgroundColor: Colors.gray2,
    borderRadius: 32,
    padding: 20,
  },
  profileImage: {
    width: "70%",
    height: "100%",
    borderRadius: 40,
  },
  name: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
