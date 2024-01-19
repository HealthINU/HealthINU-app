import { TouchableOpacity, StyleSheet, Image } from "react-native";

function ImageButton({ onPress }) {
  return (
    <TouchableOpacity
      style={({ pressed }) => [pressed && styles1.pressed]}
      onPress={onPress}
    >
      <Image
        style={{
          ...styles1.imageButtonStyle,
        }}
        source={require("../../assets/madong.png")}
      />
    </TouchableOpacity>
  );
}

export default ImageButton;

const styles1 = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  imageButtonStyle: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
});
