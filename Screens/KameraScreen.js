//  카메라 모듈 라이브러리
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef, useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
//  기기 크기 가져오기 위한 라이브러리
import { Dimensions } from "react-native";
//  외부 라이브러리 : 스타일 좋은 컴포넌트 제공하는 라이브러리
import { Button } from "@rneui/themed";
//  이미지 불러오는 라이브러리
import * as ImagePicker from "expo-image-picker";
//  이미지 resize하는 라이브러리
import * as ImageManipulator from "expo-image-manipulator";

//  page를 벗어날 때의 로직을 위한 import
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
//http://192.168.219.106:8080
//http://192.168.0.104:8080
const url = "http://138.2.59.246:8080";
const u_url = url + "/upload";
const p_url = url + "/process";

export default function KameraScreen({ navigation }) {
  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;
  //  폰 세로 길이
  const windowHeight = Dimensions.get("window").height;

  //  카메라 타입 : 후면 카메라만 사용할 예정
  const [type, setType] = useState(CameraType.back);

  //  카메라 권한 상태 : 초기에는 null
  const [permission, requestPermission] = useState(null);

  //  카메라 참조하기 위한 ref
  let cameraRef = useRef(null);

  //  찍은 사진을 저장하기 위한 state
  const [image, setImage] = useState(null);

  //  플래시 상태 : 초기에는 off
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  //  카메라 비율 : 1대1
  const [ratio, setRatio] = useState("1:1");

  //  페이지를 벗어났는지 체크할 state
  const [blured, setBlured] = useState(false);

  //  이 화면이 focus 되면 blured false로 바꾸고
  //  이 화면이 blur 되면 (이 화면에서 나가면) blured를 true로 바꾼다.
  useFocusEffect(() => {
    setBlured(false);
    return () => {
      setBlured(true);
    };
  });

  //  blured가 바뀔 때마다
  //  찍은 사진을 초기화한다.
  useEffect(() => {
    setImage(null);
  }, [blured]);

  //  컴포넌트가 렌더링되면
  //  카메라 권한을 요청한다.
  //  권한이 허용되면 permission을 true로 바꾼다.
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      requestPermission(cameraStatus.status === "granted");
    })();
  }, []);

  //  찍은 사진을 서버에 전송하는 함수
  const req_image = async (image) => {
    //  formData를 만들어서
    //  필요한 정보들 넣어줌
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

    //  서버에 전송
    //  서버로부터 이미지 경로 받아옴
    //  url 본인의 로컬 ip로 바꿔야 함
    const response = await fetch(u_url, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    //  json으로 변환
    const data = await response.json();
    console.log(data);

    //  서버에 요청
    //  이미지 경로를 보내고
    //  그 이미지 분류 결과를 받아옴
    //  url 본인의 로컬 ip로 바꿔야 함
    const result = await axios.post(p_url, {
      imagePath: data.imagePath,
    });

    //  분류 결과를 return
    return result.data;
  };

  //  사진 찍는 함수
  const takePictureHandler = async () => {
    // cameraRef가 없으면 실행되지 않게 함
    if (!cameraRef.current) return;

    // 찍은 사진 base64로 저장
    await cameraRef.current
      .takePictureAsync({
        base64: true,
      })
      .then(async (data) => {
        //  1대1 크기로 resize함
        const manipResult = await ImageManipulator.manipulateAsync(
          data.uri,
          [{ resize: { width: data.width, height: data.width } }],
          { format: "jpeg" }
        );
        //  찍은 사진을 state에 저장
        setImage(manipResult);
      });
  };

  //  갤러리에서 사진 가져오는 함수
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      //  비율을 1대1로 고정
      aspect: [1, 1],
      quality: 1,
    });

    //  도중에 취소하지 않았으면
    if (!result.canceled) {
      //  이미지가 아니면 return
      if (result.assets[0].type != "image") return;
      //  이미지면 state에 저장
      setImage(result.assets[0]);
    }
  };

  //  권한이 허용되지 않았으면
  //  오류 페이지 보여줌
  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      {/* 화면이 활성화되어 있고 이미지가 없을 때*/}
      {!blured && !image && (
        <View style={{ flex: 1 }}>
          {/* 카메라 화면 보여줌 */}
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
          ></Camera>

          {/* 사진 찍는 버튼과 갤러리 버튼 */}
          <Button title="Take a Picture" onPress={takePictureHandler} />
          <Button title="Gallery" onPress={pickImage} />
        </View>
      )}

      {/* 이미지가 있으면 (사진을 찍었거나 갤러리에서 가져온 경우) */}
      {image ? (
        <View>
          {/* 이미지 보여줌 */}
          <Image
            source={{ uri: image.uri }}
            style={{
              width: windowWidth,
              height: windowWidth,
              marginTop: (windowHeight - windowWidth) / 2,
            }}
          />

          {/* 사진 다시 찍는 버튼 */}
          <Button title="Retake" onPress={() => setImage(null)} />
          {/* 
            업로드 버튼
            사진을 서버에 전송하고
            Predict 페이지로 이동
          */}
          <Button
            title="Upload"
            onPress={async () => {
              const data = await req_image(image);
              console.log(data);
              navigation.navigate("Predict", { data: data.result });
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
