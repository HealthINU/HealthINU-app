import { Pressable, StyleSheet, Text, View } from "react-native";

import styles from "../../styles/styles";

function Button({ children, onPress, style, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles1.button,
        pressed && styles1.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <View style={styles1.buttonContent}>
        <Text style={[styles1.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;
{
  /*buttonStyle={styles.signButton}
    titleStyle={styles.generalFont}
    containerStyle={styles.signContainer} */
}
const styles1 = StyleSheet.create({
  button: {
    ...styles.signButton,
    ...styles.signContainer,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    ...styles.generalFont,
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center", // 수직 정렬을 위해 가운데 정렬
    alignItems: "center", // 수평 정렬을 위해 가운데 정렬
  },
});
