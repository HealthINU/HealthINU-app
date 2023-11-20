//  스타일만 모아둔 파일

import { StyleSheet } from "react-native";

//  container : 최상위 View의 스타일
//  inputStart : Textinput 시작
//  input : TextInput의 스타일
//  text : Text의 스타일
//  title : 제목 스타일
//  subtitle : 부제목 스타일
//  signButton : SIGN IN, SIGN UP 버튼 스타일
//  signFont : SIGN IN, SIGN UP 버튼 font
//  signContainer : SIGN IN, SIGN UP 버튼 container
//  choiceContainer : SIGN IN, SIGN UP 화면 고르는 container
//  cameraButton : Button, TouchableOpacity 등의 스타일
//  background : 배경 스타일

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  inputStart: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#888888",
    marginBottom: 4,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    width: "50%",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 32,
    position: "absolute",
    marginTop: 96
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 32,
    width: "50%",
    textAlign: "center",
    alignSelf: "center",
  },
  signButton: {
    backgroundColor: "#007aff",
    borderRadius: 39,
    height: 40,
  },
  signFont: {
    fontWeight: "bold", fontSize: 16
  },
  signContainer: {
    width: "100%",
    marginBottom: 16
  },
  choiceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 32,
    paddingHorizontal: 64,
  },
  cameraButton: {
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
