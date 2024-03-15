import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { Colors } from "../../constant/Color";
import IconButton from "../ui/IconButton";

function ExerciseItem({ id, text, onPress, category }) {
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
              }}>
              <Image
                source={require("../../assets/madong.png")}
                style={{ width: 64, height: 64, borderRadius: 32 }}
              />
              <View>
                <Text style={styles1.exerciseText}>{text}</Text>
                <Text style={{ ...styles1.exerciseText, color: Colors.gray1 }}>
                  {category}
                </Text>
              </View>
            </View>
          </View>

          <IconButton icon={"heart-sharp"} color={Colors.white1} size={30} />
        </View>
      </Pressable>
    </View>
  );
}

export default ExerciseItem;

const styles1 = StyleSheet.create({
  exerciseItem: {
    margin: 8,
    borderRadius: 6,
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
