import { StyleSheet, View, Text, Modal, Image, ScrollView } from "react-native";

import IconButton from "../components/ui/IconButton";
import { Colors } from "../constant/Color";
import styles from "../styles/styles";
import { Images } from "../components/Exercise/ImgPath";

import { Linking } from "react-native";
import ExDetailDesc from "../components/Exercise/ExDetailDesc";
//import { searchYoutube } from "../../util/youtube_search";

function ExerciseDetail({
  visible,
  onCancel,
  description1,
  description2,
  title,
  category,
  eng_name,
  navigation,
}) {
  // async function searchingYoutube(name) {
  //   try {
  //     // searchYoutube 함수의 결과를 기다림
  //     const result = await searchYoutube(name);
  //     console.log(result); // 결과를 콘솔에 출력하거나 다른 처리를 수행
  //   } catch (error) {
  //     console.error(error); // 에러 처리
  //   }
  // }
  async function searchingYoutube(name) {
    try {
      const url = `https://www.youtube.com/results?search_query=${name}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`링크를 열 수 없습니다: ${url}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const descList1 = description1?.split("\n");
  const descList2 = description2?.split("\n");

  function moveExercising() {
    //  eng_name은 운동 영어 이름, title은 운동 한국어 이름
    onCancel();
    navigation.navigate("ExerciseRecord", { eng_name: eng_name, title: title });
  }

  return (
    <Modal visible={visible} animationType="slide">
      {visible ? (
        <View style={styles1.inputContainer}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <View style={styles1.buttonContainer}>
              <IconButton
                icon={"arrow-back-circle-outline"}
                color={Colors.white1}
                size={32}
                onPress={onCancel}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: Colors.gray2,
              borderRadius: 16,
            }}>
            <Image style={styles1.Image} source={Images[eng_name]} />
            {/* 북마크, 기록 추가 뷰 */}
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-around",
                backgroundColor: Colors.gray2,
              }}>
              <View>
                {/* 북마크 */}
                <IconButton
                  icon={"heart-sharp"}
                  color={Colors.white1}
                  size={32}
                />
                <Text
                  style={{
                    ...styles.text,
                    fontSize: 13,
                    color: Colors.gray1,
                    paddingBottom: 10,
                  }}>
                  북마크
                </Text>
              </View>
              <View>
                {/* 기록 추가 */}
                <IconButton
                  icon={"add-circle"}
                  color={Colors.white1}
                  size={32}
                  onPress={moveExercising}
                />
                <Text
                  style={{
                    ...styles.text,
                    fontSize: 13,
                    color: Colors.gray1,
                    alignSelf: "center",
                    paddingBottom: 10,
                  }}>
                  기록 추가
                </Text>
              </View>
            </View>
          </View>

          {/* 기구 이름 */}
          <Text
            style={{
              ...styles.titletext,
              fontSize: 24,
              alignSelf: "flex-start",
              marginLeft: 16,
              marginTop: 16,
            }}>
            {title}
          </Text>
          {/* 카테고리 */}
          <Text
            style={{
              ...styles.text,
              fontSize: 16,
              color: Colors.gray1,
              alignSelf: "flex-start",
              marginLeft: 16,
              marginBottom: 16,
            }}>
            {category}
          </Text>
          <ScrollView
            style={{
              width: "100%",
            }}>
            <Text style={[styles1.toc]}>- 준비 단계</Text>
            {/* 준비 단계 텍스트 출력 */}
            {descList1?.map((line, index) => {
              return (
                <ExDetailDesc
                  key={`${title}_${index}_0`}
                  title={title}
                  line={line}
                  index={index}
                  num={1}
                />
              );
            })}
            <Text style={[styles1.toc]}>- 운동</Text>
            {/* 운동 단계 텍스트 출력 */}
            {descList2?.map((line, index) => {
              return (
                <ExDetailDesc
                  key={`${title}_${index}_1`}
                  title={title}
                  line={line}
                  index={index}
                  num={2}
                />
              );
            })}
          </ScrollView>
          {/* 유튜브 이동버튼 title로 검색하게 하기 */}
          <View>
            <IconButton
              icon={"logo-youtube"}
              color={Colors.white1}
              size={30}
              onPress={() => searchingYoutube(title)}
            />
          </View>
        </View>
      ) : null}
    </Modal>
  );
}

export default ExerciseDetail;

const styles1 = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.black,
  },
  buttonContainer: {
    // marginTop: 16,
    flexDirection: "row",
  },
  Image: {
    width: 100,
    height: 100,
    margin: 20,
    borderRadius: 16,
  },
  toc: {
    ...styles.text,
    fontSize: 16,
    alignSelf: "flex-start",
    marginLeft: 16,
    marginVertical: 16,
  },
});
