import { View, Text, Dimensions, StyleSheet, Image, Alert } from "react-native";
//Context import
import { useContext, useState } from "react";
import { AuthContext } from "../util/auth-context";

import styles from "../styles/styles";
import { Colors } from "../constant/Color";
//npx npm install react-native-calendars필요
import { Calendar } from "react-native-calendars";
import BottomNav from "../components/ui/BottomNav";
import Button from "../components/ui/Button";

//  폰 가로 길이
const windowWidth = Dimensions.get("window").width;
//  폰 세로 길이
const windowHeight = Dimensions.get("window").height;

function Profile({ navigation }) {
  const authCtx = useContext(AuthContext);
  //  유저 정보 가져오기
  const user_info = authCtx.info.user;
  // 운동 기록 가져오기
  const record = authCtx.info.record;

  const [userRecord, setUserRecord] = useState(record);
  console.log(userRecord);
  //달력 표시 예제
  // const [events, setEvents] = useState({
  //   "2024-04-21": {
  //     selected: true,
  //     marked: true,
  //     selectedColor: "blue",
  //     description1: "푸쉬업 10회",
  //     description2: "친업 20회",
  //   },
  //   "2024-04-24": {
  //     marked: true,
  //     dotColor: "red",
  //     activeOpacity: 0,
  //     description1: "레그톱 20회",
  //     description2: "윗몸 30회",
  //   },
  // });
  //운동 설명
  const [exercise_des, setExercise_des] = useState();

  //예시 : 날짜 선택시 정보 알려줌
  // const handleDayPress = (day) => {
  //   const date = day.dateString;
  //   const description = events[date]
  //     ? events[date].description1 + "   " + events[date].description2
  //     : "운동 정보가 없습니다.";
  //   setExercise_des(description);
  //   Alert.alert(date, description);
  // };
  // const handleDayPress = () => {
  //   const date = userRecord.data[0].record_date;
  //   const description = userRecord.data
  //     ? userRecord.data[0].Equipment.equipment_name + " "+ userRecord.data[0].record_weight + "kg "+ userRecord.data[0].record_count + "회"
  //     : "운동 정보가 없습니다.";
  //   setExercise_des(description);
  //   Alert.alert(date, description);
  // };
  const handleDayPress = (date) => {
    let description = "운동 정보가 없습니다.";
    const selectedRecords = userRecord.data.filter(
      (record) => record.record_date === date.dateString
    );
    if (selectedRecords.length > 0) {
      description = selectedRecords
        .map((record) => {
          return (
            record.Equipment.equipment_name +
            " " +
            record.record_weight +
            "kg " +
            record.record_count +
            "회"
          );
        })
        .join("\n");
    }
    setExercise_des(description);
    Alert.alert(date.dateString, description);
  };

  const markedDates = {};
  userRecord.data.forEach((record) => {
    markedDates[record.record_date] = {
      dotColor: record.dotColor,
      marked: true,
    };
  });
  console.log(markedDates);

  //프로필 수정화면
  function profileEdit() {
    navigation.navigate("ChangeProfile");
  }

  return (
    <View style={styles.container}>
      <View style={style1.profilecontainer}>
        <View style={{ flex: 3, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/madong.png")}
            style={style1.profileImage}
          />
          <View style={style1.name}>
            <Text style={[styles.text, { fontSize: 20 }]}>
              {user_info.user_name}
            </Text>
          </View>
        </View>
        <View style={{ flex: 7, marginTop: 10 }}>
          <Calendar
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#000000",
            }}
            theme={{
              backgroundColor: "#000000",
              calendarBackground: "#000000",
              textSectionTitleColor: "#fff",
              selectedDayBackgroundColor: "#ffffff",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#8080ff",
              dayTextColor: "#fff",
              textDisabledColor: "#fff",
              arrowColor: "#40ff40",
              monthTextColor: "#fff",
              "stylesheet.calendar.header": {
                dayTextAtIndex0: {
                  color: "#ff8080",
                },
                dayTextAtIndex6: {
                  color: "#8080ff",
                },
              },
            }}
            //markedDates={events}
            markedDates={markedDates}
            onDayPress={handleDayPress}
          />
        </View>
        {/*<View style={{ flex: 1, marginTop: 10, marginBottom: 50 }}>
          <Text style={styles.text}>{exercise_des}</Text>
          </View>*/}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              children={"logout"}
              onPress={authCtx.logout}
              style={style1.customButton}
              textStyle={style1.customText}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Button
              children={"profile edit"}
              onPress={profileEdit}
              style={style1.customButton}
              textStyle={style1.customText}
            />
          </View>
        </View>
      </View>
      <BottomNav navigation={navigation} />
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
    marginBottom: 20,
    //backgroundColor: Colors.gray2,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
  },
  customButton: {
    height: windowHeight * 0.075,
    width: windowWidth * 0.4,
  },
  customText: {
    fontSize: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  name: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
