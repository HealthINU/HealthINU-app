import { StyleSheet, View, Text, Modal, Image } from "react-native";

import IconButton from "../ui/IconButton";
import { Colors } from "../../constant/Color";
import styles from "../../styles/styles";

function ExerciseDetail({ visible, onCancel, description }) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles1.inputContainer}>
        <Image
          style={styles.Image}
          source={require("../../assets/madong.png")}
        />
        <Text style={styles1.modaltext}>{description}</Text>
        <View style={styles1.buttonContainer}>
          <IconButton
            icon={"caret-down-outline"}
            color={Colors.white1}
            size={50}
            onPress={onCancel}
          />
        </View>
      </View>
    </Modal>
  );
}

export default ExerciseDetail;

const styles1 = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.skyblue1,
  },
  modaltext: {
    ...styles.text,
    backgroundColor: Colors.blue1,
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
});
