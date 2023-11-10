import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import { Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function KameraScreen({ navigation }) {
  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useState(null);
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [ratio, setRatio] = useState("1:1"); // default is 4:3
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      requestPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      setImage(null);
    });
  }, [navigation]);

  const req_image = (image) => {
    // 서버 api에 Post 요청
    const formData = new FormData();
    formData.append("name", "test");
    formData.append("image", {
      uri:
        Platform.OS === "android"
          ? image.uri
          : image.uri.replace("file://", ""),
      name: "image.jpg",
      type: "image/jpeg",
    });

    fetch("http://192.168.219.106:8080/upload", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const takePictureHandler = async () => {
    // cameraRef가 없으면 해당 함수가 실행되지 않게 가드
    if (!cameraRef.current) return;

    // takePictureAsync를 통해 사진을 찍습니다.
    // 찍은 사진은 base64 형식으로 저장합니다.
    await cameraRef.current
      .takePictureAsync({
        base64: true,
      })
      .then(async (data) => {
        // setPreviewVisible(true);
        const manipResult = await ImageManipulator.manipulateAsync(
          data.uri,
          [{ resize: { width: data.width, height: data.width } }],
          { format: "jpeg" }
        );
        console.log(data.width);
        console.log(data.height);
        setImage(manipResult);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets[0].type != "image") return;
      setImage(result.assets[0]);
    }
  };

  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      {!image && (
        <View style={{ flex: 1 }}>
          <Camera
            style={{
              ...styles.camera,
              width: windowWidth,
              height: windowWidth,
              marginTop: (windowHeight - windowWidth) / 2,
            }}
            type={type}
            ref={cameraRef}
            flashMode={flash}
            ratio={ratio}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 30,
              }}
            ></View>
          </Camera>
          <Button title="Take a picture" onPress={takePictureHandler} />
          <Button title="Gallery" onPress={pickImage} />
        </View>
      )}

      {image ? (
        <View>
          <Image
            source={{ uri: image.uri }}
            style={{
              width: windowWidth,
              height: windowWidth,
              marginTop: (windowHeight - windowWidth) / 2,
            }}
          />
          <Button title="Retake" onPress={() => setImage(null)} />
          <Button
            title="Upload"
            onPress={() => {
              req_image(image);
              navigation.navigate("Predict");
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {},
});
