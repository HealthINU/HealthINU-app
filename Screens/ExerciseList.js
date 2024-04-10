import { useState, useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ExerciseItem from "../components/Exercise/ExerciseItem";
import { Colors } from "../constant/Color";
import IconButton from "../components/ui/IconButton";
import styles from "../styles/styles";
import ExerciseDetail from "./ExerciseDetail";
import { AuthContext } from "../util/auth-context";
import BottomNav from "../components/ui/BottomNav";

function ExerciseSearch({ navigation, route }) {
  const authCtx = useContext(AuthContext);
  const equipment = authCtx.info.equipment;

  //카메라에서 이 화면으로 이동하는데 여기 title에 값이 전달
  const [title, setTitle] = useState(route.params?.title || "");
  console.log("가져와진 운동 : " + title);

  //운동 데이터 예시(categories를 넣어서 나중에 분류화면 만들 예정)
  const [exerciseItems, setExerciseItems] = useState(equipment);
  //모달 여는 용도 변수
  const [modalIsVisible, setModalIsVisible] = useState(false);
  //운동 데이터 설명 변수1(모달로 전달)
  const [selectedExercise1, setSelectedExercise1] = useState(null);
  //운동 데이터 설명 변수2(모달로 전달)
  const [selectedExercise2, setSelectedExercise2] = useState(null);
  //운동 데이터 제목 변수(모달로 전달)
  const [titleExercise, setTitleExercise] = useState(null);
  //운동 데이터 category 변수(모달로 전달)
  const [category, setCategory] = useState(null);
  //운동 이미지 변수(모달로 전달)
  const [exerciseImage, setExerciseImage] = useState(null);
  //운동 영어 이름 변수(모달로 전달)
  const [engName, setEngName] = useState(null);
  const [equip_num, setEquip_num] = useState(null);

  //북마크 저장 변수
  const [bookmarks, setBookmarks] = useState([]);
  // 현재 선택된 아이템의 북마크 상태를 관리하는 상태 변수
  const [currentBookmarkStatus, setCurrentBookmarkStatus] =
    useState("heart-outline");
  // 현재 선택된 운동 아이템 상태 변수
  const [currentItemSelected, setCurrentItemSelected] = useState(null);
  const bookmarkHandler = () => {
    heartButtonPressHandler(currentItemSelected);
    // 북마크 상태인 경우 하트가 채워지도록 설정
    const bookmarked = isItemBookmarked(currentItemSelected);
    setCurrentBookmarkStatus(bookmarked ? "heart-sharp" : "heart-outline");
  };

  // 북마크된 아이템만 보기 상태를 추가
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  // 북마크 표시 토글 함수
  const toggleShowOnlyBookmarked = () => {
    setShowOnlyBookmarked((current) => !current);
  };
  // 북마크된 아이템만 보이게 하는 로직을 추가한 FlatList의 data prop
  const filteredExerciseItems = showOnlyBookmarked
    ? exerciseItems.filter((item) =>
        bookmarks.some(
          (bookmark) => bookmark.equipment_num === item.equipment_num
        )
      )
    : exerciseItems;

  //모달 열기 함수
  function startAddFoalHandler(detail) {
    setSelectedExercise1(detail.equipment_description1);
    setSelectedExercise2(detail.equipment_description2);
    setTitleExercise(detail.equipment_name);
    setCategory(detail.equipment_category);
    setEngName(detail.equipment_eng);
    setEquip_num(detail.equipment_num);
    setModalIsVisible(true);
  }
  //운동 아이템 클릭 시 실행될 함수
  function handleItemClick(item) {
    // 현재 선택된 아이템 상태 업데이트
    setCurrentItemSelected(item);
    //모달 창 열기
    startAddFoalHandler(item);
    // 북마크 상태인 경우 하트가 채워지도록 설정
    const bookmarked = isItemBookmarked(item);
    setCurrentBookmarkStatus(bookmarked ? "heart-sharp" : "heart-outline");
  }

  //모달 닫기 함수
  function endAddFoalHandler() {
    setModalIsVisible(false);
  }
  //Main화면 돌아감
  function moveMain() {
    navigation.navigate("Main");
  }

  //북마크 함수
  // async function saveBookmarks(value) {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem('@bookmarks', jsonValue);
  //   } catch (e) {
  //     // 저장 에러 처리
  //     console.log(e);
  //   }
  // }
  async function saveBookmarks(value) {
    try {
      // 사용자별 북마크 키 생성을 위해 사용자 토큰을 가져옵니다.
      const userToken = authCtx.token;

      // JSON 문자열로 변환
      const jsonValue = JSON.stringify(value);

      // 사용자 토큰을 기반으로 한 고유 키를 생성합니다.
      // 예: '@bookmarks:userToken'
      const bookmarksKey = `@bookmarks:${userToken}`;

      // AsyncStorage에 사용자별 북마크 데이터 저장
      await AsyncStorage.setItem(bookmarksKey, jsonValue);
    } catch (e) {
      // 저장 에러 처리
      console.log(e);
    }
  }

  function heartButtonPressHandler(item) {
    // 아이템이 이미 북마크 되었는지 확인
    const isBookmarked = bookmarks.find(
      (bookmark) => bookmark.equipment_num === item.equipment_num
    );

    if (!isBookmarked) {
      const newBookmarks = [...bookmarks, item];
      setBookmarks(newBookmarks);
      saveBookmarks(newBookmarks);
      console.log("북마크 추가됨", item.equipment_name);
    } else {
      // 이미 북마크된 아이템을 제거
      const filteredBookmarks = bookmarks.filter(
        (bookmark) => bookmark.equipment_num !== item.equipment_num
      );
      setBookmarks(filteredBookmarks);
      saveBookmarks(filteredBookmarks);
      console.log("북마크 제거됨", item.equipment_name);
    }
  }
  // 북마크 상태 확인 함수
  function isItemBookmarked(item) {
    const isBookmarked = bookmarks.find(
      (bookmark) => bookmark.equipment_num === item.equipment_num
    );
    return isBookmarked;
  }
  //북마크 로드
  async function loadBookmarks() {
    try {
      const jsonValue = await AsyncStorage.getItem("@bookmarks");
      return jsonValue != null ? setBookmarks(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // 로드 에러 처리
      console.log(e);
    }
  }

  useEffect(() => {
    loadBookmarks();
  }, []);

  useEffect(() => {
    if (title === "") {
      return;
    }
    const exercise = equipment.find((item) => item.equipment_name === title);
    startAddFoalHandler(exercise);
    setTitle("");
  }, [title]);

  return (
    <View style={{ ...styles.listContainer, height: "auto" }}>
      <View>
        <IconButton
          icon={"heart-sharp"}
          color={Colors.white1}
          size={32}
          onPress={toggleShowOnlyBookmarked}
        />
      </View>
      {/*운동리스트*/}
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredExerciseItems}
          renderItem={(itemData) => {
            // 현재 아이템의 북마크 상태 확인
            const bookmarked = isItemBookmarked(itemData.item);
            return (
              <View>
                <ExerciseItem
                  text={itemData.item.equipment_name}
                  id={itemData.item.equipment_num}
                  eng_name={itemData.item.equipment_eng}
                  category={itemData.item.equipment_category}
                  equipment_num={itemData.item.equipment_num}
                  onPress={() => {
                    handleItemClick(itemData.item);
                  }}
                  navigation={navigation}
                  bookmark={() => heartButtonPressHandler(itemData.item)}
                  BookmarkStatus={bookmarked ? "heart-sharp" : "heart-outline"}
                />
              </View>
            );
          }}
        />
        <ExerciseDetail
          visible={modalIsVisible}
          onCancel={endAddFoalHandler}
          description1={selectedExercise1}
          description2={selectedExercise2}
          title={titleExercise}
          eng_name={engName}
          category={category}
          navigation={navigation}
          bookmark={bookmarkHandler}
          BookmarkStatus={currentBookmarkStatus}
        />
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
}

export default ExerciseSearch;
