//  스타일만 모아둔 파일

import { StyleSheet } from "react-native";
import { Colors } from "../constant/Color";

//  container : 최상위 View의 스타일
//  inputStart : Textinput 시작
//  input : TextInput의 스타일
//  text : Text의 스타일
//  title : 제목 스타일
//  subtitle : 부제목 스타일
//  signButton : SIGN IN, SIGN UP 버튼 스타일
//  signContainer : SIGN IN, SIGN UP 버튼 container
//  choiceContainer : SIGN IN, SIGN UP 화면 고르는 container
//  cameraButton : Button, TouchableOpacity 등의 스타일
//  background : 배경 스타일

// -----------------------------------------------
//	필요한 컴포넌트

//  고정
//  backgroundColor : 배경 색상 (검은색)
//	color : 폰트 색상 (흰색)
//	borderColor -> 테두리 색상
//	border...Width -> 테두리 너비
//	borderRadius -> 테두리 둥글게 (16)
//	이미지 (너비, 높이) -> 나중에 고정 수치로 설정
//	textAlign -> 텍스트 정렬 (가로축?)
//	alignSelf -> 텍스트 정렬 (세로축?)
//	flexDirection -> 자식들 배치 방향?
//	justifyContent -> 자식들끼리 배치 방식

//  변동
//	width -> 너비
//	height -> 높이
//	fontWeight -> 폰트 굵기 (bold)
//  fontSize -> 폰트 크기 (14)
//	justifyContent -> 세로 축 기준 정렬? (center)
//	alignItems ->  축 기준 정렬? (center)
//	margin -> 마진(밀어내기) (10)
//	padding -> 패딩(공간줄이면서 밀어내기)
//  padding top (20)

//	텍스트
//		제목
//      fontSize(40)

//		일반 텍스트
//      fontSize(20)

//	입력창
//    width: "80%" ( 기본 )
//		아이디, 비밀번호 입력창
//      height: 40 ( 기본 )
//		일반 입력창 ( 검색창 등 )
//      height: ""
//
//	버튼
//		width :

//	전체 view
//     flex: 1,
//     backgroundColor: "#000000",
//     alignItems: "center",
//     paddingTop: 20,

//  동영상 썸네일 컴포넌트
//    width: "70%"
//    height: width의 16:9 비율
//	카드?

// -----------------------------------------------

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    paddingTop: 20,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  choiceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    borderColor: "#007aff",
  },
  titletext: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#ffffff",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    marginTop: 96,
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
    backgroundColor: Colors.blue1,
    borderRadius: 16,
    height: 40,
    marginTop: 16,
  },
  signContainer: {
    width: "100%",
    marginBottom: 16,
  },
  choiceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingHorizontal: 64,
  },
  generalButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    marginHorizontal: 8,
  },
  generalFont: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
  },
});
