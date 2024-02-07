import { StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "../../constant/Color";
function ExerciseItem({ id, text, onPress }) {
  return (
    <View style={styles1.exerciseItem}>
      <Pressable
        android_ripple={{ color: Colors.blue1 }}
        onPress={onPress}
        style={({ pressed }) => pressed && styles1.pressedItem}
      >
        <Text style={styles1.exerciseText}>{text}</Text>
      </Pressable>
    </View>
  );
}

export default ExerciseItem;

const styles1 = StyleSheet.create({
  exerciseItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: Colors.white1,
  },
  pressedItem: {
    opacity: 0.5,
  },
  exerciseText: {
    color: "black",
    padding: 8,
  },
});
