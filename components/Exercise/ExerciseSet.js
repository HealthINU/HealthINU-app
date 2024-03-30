import { StyleSheet, View, Text, TextInput } from "react-native";

import { Colors } from "../../constant/Color";
import styles from "../../styles/styles";

function ExerciseSet({ text }) {
  return (
    <View
      style={{
        ...styles.setContainer,
        width: "100%",
        justifyContent: "space-around",
        marginVertical: 4,
      }}>
      <TextInput
        placeholder="10kg"
        keyboardType="decimal-pad"
        placeholderTextColor={Colors.gray1}
        color={Colors.white1}
        style={{ fontSize: 16 }}
      />
      <TextInput
        placeholder="10"
        keyboardType="decimal-pad"
        placeholderTextColor={Colors.gray1}
        color={Colors.white1}
        style={{ fontSize: 16 }}
      />
    </View>
  );
}

export default ExerciseSet;

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
    color: Colors.white1,
    padding: 8,
  },
});
