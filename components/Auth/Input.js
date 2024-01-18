import { View, TextInput } from "react-native";

import styles from "../../styles/styles";
function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={label}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholderTextColor="#888888"
      />
    </View>
  );
}

export default Input;
