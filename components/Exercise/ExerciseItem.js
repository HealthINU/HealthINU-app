import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Colors } from "../../constant/Color";
import IconButton from "../ui/IconButton";
import { Images } from "./ImgPath";

function ExerciseItem({ id, text, onPress, category, eng_name, navigation }) {
  // 운동 테스트 화면 이동(임시)
  function moveExercising() {
    //  eng_name은 운동 영어 이름, title은 운동 한국어 이름
    navigation.navigate("ExerciseRecord", { eng_name: eng_name, title: text });
  }

  return (
    <View style={styles1.exerciseItem}>
      <Pressable
        android_ripple={{ color: Colors.blue1 }}
        onPress={onPress}
        style={({ pressed }) => pressed && styles1.pressedItem}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 8,
                marginLeft: 8,
              }}>
              <Image
                source={Images[eng_name]}
                style={{ width: 64, height: 64, borderRadius: 16 }}
              />

              <View>
                <Text style={styles1.exerciseText}>{text}</Text>
                <Text style={{ ...styles1.exerciseText, color: Colors.gray1 }}>
                  {category}
                </Text>
              </View>
            </View>
          </View>
          {/*
        운동 테스트 칸 이동
         */}
          <View>
            <View>
              <IconButton
                icon={"add-circle"}
                color={Colors.gray1}
                size={32}
                onPress={moveExercising}
              />
            </View>
            <IconButton icon={"heart-sharp"} color={Colors.white1} size={30} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ExerciseItem;

const styles1 = StyleSheet.create({
  exerciseItem: {
    margin: 8,
    borderRadius: 16,
    backgroundColor: Colors.gray2,
  },
  pressedItem: {
    opacity: 0.5,
  },
  exerciseText: {
    color: "white",
    padding: 8,
  },
});
