import { StyleSheet, View, Text, TextInput } from "react-native";

import { Colors } from "../../constant/Color";
import styles from "../../styles/styles";

function ExerciseSet({ text }) {
  return (
    <View style={styles.setContainer}>
      <Text style={[styles1.exerciseText, { marginLeft: 8, marginRight: 10 }]}>
        {text}
      </Text>
      <TextInput
        placeholder="10kg"
        keyboardType="decimal-pad"
        placeholderTextColor={Colors.gray1}
      />
      <TextInput
        placeholder="10"
        keyboardType="decimal-pad"
        placeholderTextColor={Colors.gray1}
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
