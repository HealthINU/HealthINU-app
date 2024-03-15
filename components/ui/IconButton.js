import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles1.button, pressed && styles1.pressed]}
      onPress={onPress}>
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles1 = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
    alignSelf: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
