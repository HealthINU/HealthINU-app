//  스타일만 모아둔 파일

import { StyleSheet } from "react-native";

//  container : 최상위 View의 스타일
//  input : TextInput의 스타일
//  text : Text의 스타일
//  button : Button, TouchableOpacity 등의 스타일
//  background : 배경 스타일

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#888888",
    padding: 10,
    color: "#ffffff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#007aff",
    padding: 10,
    width: 300,
    marginTop: 10,
  },
  background: {
    width: "100%",
    height: "100%",
  },
});
