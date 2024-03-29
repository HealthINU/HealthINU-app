import { View, Text } from "react-native";

import IconButton from "../ui/IconButton";

function AddRemove({ text, Button, onPress, Color }) {
  return (
    <View style={[styles.setContainer, { justifyContent: "center" }]}>
      <IconButton icon={Button} color={Color} size={30} onPress={onPress} />
      <Text style={[styles.text, { color: Color, marginTop: 12 }]}>{text}</Text>
    </View>
  );
}

export default AddRemove;
