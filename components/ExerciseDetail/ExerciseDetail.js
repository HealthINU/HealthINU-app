import { StyleSheet, View, Text, Modal, Image, ScrollView } from "react-native";

import IconButton from "../ui/IconButton";
import { Colors } from "../../constant/Color";
import styles from "../../styles/styles";

function ExerciseDetail({ visible, onCancel, description, title, category }) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles1.inputContainer}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <View style={styles1.buttonContainer}>
            <IconButton
              icon={"arrow-back-circle-outline"}
              color={Colors.white1}
              size={32}
              onPress={onCancel}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.gray2,
          }}>
          <Image
            style={styles1.Image}
            source={require("../../assets/madong.png")}
          />
          <View>
            <Text style={{ ...styles.text, paddingRight: 32 }}>{title}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            backgroundColor: Colors.gray2,
          }}>
          <View>
            <IconButton icon={"heart-sharp"} color={Colors.white1} size={32} />
            <Text
              style={{
                ...styles.text,
                fontSize: 13,
                color: Colors.gray1,
                paddingBottom: 10,
              }}>
              Bookmark
            </Text>
          </View>
          <View>
            <Text style={{ ...styles.text, padding: 10 }}>{category}</Text>
            <Text
              style={{
                ...styles.text,
                fontSize: 13,
                color: Colors.gray1,
                alignSelf: "center",
                paddingBottom: 10,
              }}>
              category
            </Text>
          </View>
        </View>
        <Text
          style={{
            ...styles.titletext,
            fontSize: 24,
            alignSelf: "flex-start",
            margin: 20,
          }}>
          Information
        </Text>
        <ScrollView
          style={{
            width: "100%",
          }}>
          <Text style={{ ...styles1.modaltext }}>{description}</Text>
        </ScrollView>
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
    backgroundColor: Colors.black,
  },
  modaltext: {
    ...styles.text,
    fontSize: 13,
    backgroundColor: Colors.gray2,
    borderRadius: 6,
    width: "100%",
    padding: 16,
  },
  buttonContainer: {
    // marginTop: 16,
    flexDirection: "row",
  },
  Image: {
    width: 100,
    height: 100,
    margin: 20,
    borderRadius: 50,
  },
});
