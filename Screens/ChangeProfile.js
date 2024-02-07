import { View, Text, StyleSheet } from "react-native";

import Input from "../components/Auth/Input";

import { Colors } from "../constant/Color";
import styles from "../styles/styles";

import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import ToggleSwitch from "../components/ui/ToggleSwitch";

function ChangeProfile({ navigation }) {
  //프로필 화면
  function profile() {
    navigation.navigate("Profile");
  }
  return (
    <View style={styles.container}>
      <View style={{ margin: 50 }}>
        <Text style={styles.titletext}>프로필 수정</Text>
      </View>
      <View style={[styles.inputStart, { marginBottom: 20 }]}>
        <Input label="Name" />
        <Input label="UserName" />
        <Input label="Age" keyboardType="decimal-pad" />
        <View style={styles1.input}>
          <Text style={[{ fontSize: 14, color: Colors.gray1 }]}>
            GenderName
          </Text>
          <View style={{ marginLeft: 100 }}>
            <ToggleSwitch />
          </View>
        </View>
        <Input label="Height" keyboardType="decimal-pad" />
        <Input label="Weight" keyboardType="decimal-pad" />
      </View>
      <Button onPress={() => {}}>수정 완료</Button>
      <IconButton
        icon={"arrow-back-outline"}
        color={Colors.white1}
        size={30}
        onPress={profile}
      />
    </View>
  );
}

export default ChangeProfile;

const styles1 = StyleSheet.create({
  input: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#888888",
    padding: 10,
    alignItems: "center",
    height: 40, // 원하는 높이로 조정
  },
});
