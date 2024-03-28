import { View, Text } from "react-native";
import IconButton from "./IconButton";
import { Colors } from "../../constant/Color";
import { Camera } from "expo-camera";

function BottomNav({ navigation }) {
  function moveMain() {
    navigation.navigate("Main");
  }

  function moveProfile() {
    navigation.navigate("Profile");
  }
  function moveExerciseList() {
    navigation.navigate("ExerciseSearch");
  }
  // 운동 테스트 화면 이동(임시)
  function moveExercising() {
    navigation.navigate("Exercising");
  }

  async function moveCamera() {
    await Camera.requestCameraPermissionsAsync();
    navigation.navigate("Kamera");
  }

  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        justifyContent: "space-around",
        backgroundColor: "#28282A",
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <View>
        <IconButton
          icon={"home"}
          color={Colors.gray1}
          size={32}
          onPress={moveMain}
        />
        <Text style={styles.grayText}>Home</Text>
      </View>

      {/*
        운동리스트 검색칸으로 이동
         */}
      <View>
        <IconButton
          icon={"fitness"}
          color={Colors.gray1}
          size={32}
          onPress={moveExerciseList}
        />
        <Text style={styles.grayText}>Ex List</Text>
      </View>

      {/*
        카메라 페이지로 가는 버튼
        누르면 카메라 권한 요청
      */}
      <View>
        <IconButton
          icon={"camera"}
          color={Colors.gray1}
          size={32}
          onPress={moveCamera}
        />
        <Text style={styles.grayText}>Camera</Text>
      </View>

      {/*
        운동 테스트 칸 이동
         */}
      <View>
        <IconButton
          icon={"add-circle"}
          color={Colors.gray1}
          size={32}
          onPress={moveExercising}
        />
        <Text style={styles.grayText}>Exercising </Text>
      </View>
      <View>
        <IconButton
          icon={"person-circle-sharp"}
          color={Colors.gray1}
          size={32}
          onPress={moveProfile}
        />
        <Text style={styles.grayText}>Profile</Text>
      </View>
    </View>
  );
}

export default BottomNav;
