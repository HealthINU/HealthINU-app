import { StyleSheet, View, Text, Modal, Image, ScrollView } from "react-native";

import IconButton from "../ui/IconButton";
import { Colors } from "../../constant/Color";
import styles from "../../styles/styles";
import { Images } from "./ImgPath";

import { Linking } from "react-native";
//import { searchYoutube } from "../../util/youtube_search";

function ExerciseDetail({
  visible,
  onCancel,
  description1,
  description2,
  title,
  category,
  eng_name,
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

  return (
    <Modal visible={visible} animationType="slide">
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
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
          <Image style={styles1.Image} source={Images[eng_name]} />
          <View>
            <Text style={{ ...styles.text, paddingRight: 32 }}>{title}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            backgroundColor: Colors.gray2,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}>
          <View>
            <IconButton icon={"heart-sharp"} color={Colors.white1} size={32} />
            <Text
              style={{
                ...styles.text,
                fontSize: 13,
                color: Colors.gray1,
                paddingBottom: 10,
              }}>
              Bookmark
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.text, padding: 10 }}>{category}</Text>
            <Text
              style={{
                ...styles.text,
                fontSize: 13,
                color: Colors.gray1,
                alignSelf: "center",
                paddingBottom: 10,
              }}>
              category
            </Text>
          </View>
        </View>
        <Text
          style={{
            ...styles.titletext,
            fontSize: 24,
            alignSelf: "flex-start",
            margin: 20,
          }}>
          Information
        </Text>
        <ScrollView
          style={{
            width: "100%",
          }}>
          <Text style={{ ...styles1.modaltext }}>{description1}</Text>
          <Text style={{ ...styles1.modaltext }}>{description2}</Text>
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
  modaltext: {
    ...styles.text,
    fontSize: 13,
    backgroundColor: Colors.gray2,
    borderRadius: 6,
    width: "100%",
    padding: 16,
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
});
