import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
//Context import
import { useContext } from "react";
import { AuthContext } from "../util/auth-context";

import IconButton from "../components/ui/IconButton";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";

//  폰 가로 길이
const windowWidth = Dimensions.get("window").width;
//  폰 세로 길이
const windowHeight = Dimensions.get("window").height;

function Profile({ navigation }) {
  const authCtx = useContext(AuthContext);

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
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={require("../assets/madong.png")}
            style={style1.profileImage}
          />
          <View style={style1.name}>
            <Text style={[styles.text, { fontSize: 30 }]}>유동현</Text>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <Text style={styles.text}>설명란 or 잔디</Text>
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
