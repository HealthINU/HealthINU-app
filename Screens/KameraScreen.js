//  카메라 모듈 라이브러리
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef, useContext } from "react";
import {
  Image,
  Text,
  View,
  StatusBar,
  TextInput,
  StyleSheet,
} from "react-native";
import * as FileSystem from "expo-file-system";

import IconButton from "../components/ui/IconButton";
import { Colors } from "../constant/Color";

//  기기 크기 가져오기 위한 라이브러리
import { Dimensions } from "react-native";
//  이미지 불러오는 라이브러리
import * as ImagePicker from "expo-image-picker";
//  이미지 resize하는 라이브러리
import * as ImageManipulator from "expo-image-manipulator";

//  page를 벗어날 때의 로직을 위한 import
import { useFocusEffect } from "@react-navigation/native";

import config from "../config/config.json";

const URL = config.URL;
const predict_url = "http://" + URL + ":8080/image/upload";
const after_url = "http://" + URL + ":8080/info/body";

import styles from "../styles/styles";
import Button from "../components/ui/Button";

import { AuthContext } from "../util/auth-context";

export default function KameraScreen({ navigation }) {
  //Main화면 돌아감
  function moveMain() {
    navigation.navigate("Main");
  }

  const authCtx = useContext(AuthContext);
  //  폰 가로 길이
  const windowWidth = Dimensions.get("window").width;
  //  폰 세로 길이
  const windowHeight = Dimensions.get("window").height;

  //  카메라 타입 : 전후면 전환 가능
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

  //  키와 몸무게 state
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);

  console.log(height, weight);
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
  const req_image = async (image, uploadType) => {
    //  formData를 만들어서
    //  필요한 정보들 넣어줌
    const formData = new FormData();
    // formData.append("name", "test");

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

    const img_url =
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "");

    //  받은 uploadType에 따라 다른 url로 전송
    const to_post_url = uploadType === "predict" ? predict_url : after_url;

    let res = await FileSystem.uploadAsync(to_post_url, img_url, {
      fieldName: "image",
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      //  키와 몸무게를 같이 보냄 ( 유저 사진 추가 시에만 유효 )
      parameters: {
        height: height == null ? "0" : height,
        weight: weight == null ? "0" : weight,
      },
      headers: {
        Authorization: "Bearer " + authCtx.token,
      },
    });

    console.log(res.body);
    res = JSON.parse(res.body);
    return res;
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
      <StatusBar hidden={true} />
      {/* 화면이 활성화되어 있고 이미지가 없을 때*/}
      {!blured && !image && (
        <View style={{ flex: 1 }}>
          {/* 전후면 전환 뷰*/}
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              justifyContent: "flex-end",
              height: 64,
              width: windowWidth,

              top: 16,
            }}
          >
            {/* 전후면 전환 버튼*/}
            <IconButton
              icon={"sync"}
              color={Colors.white1}
              size={50}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
          </View>

          {/* 카메라 화면 보여줌 */}
          <Camera
            style={{
              ...styles.camera,
              width: windowWidth,
              height: windowWidth,
              marginTop: (windowHeight - windowWidth) / 2 - 20,
            }}
            type={type}
            ref={cameraRef}
            flashMode={flash}
            ratio={ratio}
          ></Camera>

          {/* 사진 찍는 버튼과 갤러리 버튼 */}
          <View
            style={{
              width: windowWidth,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: (windowHeight - windowWidth) / 4,
            }}
          >
            {/* 갤러리에서 사진 가져오는 버튼 */}
            <IconButton
              icon={"image"}
              color={Colors.white1}
              size={50}
              onPress={pickImage}
            />
            {/* 사진 찍는 버튼 */}
            <IconButton
              icon={"radio-button-on"}
              color={Colors.white1}
              size={64}
              onPress={takePictureHandler}
            />
            {/* 메인 복귀 버튼 */}
            <IconButton
              icon={"home"}
              color={Colors.white1}
              size={50}
              onPress={moveMain}
            />
          </View>
        </View>
      )}

      {/* 이미지가 있으면 (사진을 찍었거나 갤러리에서 가져온 경우) */}
      {image ? (
        <View>
          <View
            style={{
              position: "absolute",
              width: windowWidth,
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 32,
            }}
          >
            {/* 사진 다시 찍는 버튼 */}
            {/* <IconButton
              icon={"camera-reverse-outline"}
              color={Colors.white1}
              size={50}
              onPress={() => setImage(null)}
            /> */}

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button style={{ width: "45%" }} onPress={() => setImage(null)}>
                다시 찍기
              </Button>
              <Button
                style={{ width: "45%" }}
                onPress={async () => {
                  const data = await req_image(image, "predict");
                  console.log(data);
                  navigation.navigate("Predict", { data: data.result });
                }}
              >
                기구 분류
              </Button>
            </View>

            {/* 
            업로드 버튼
            사진을 서버에 전송하고
            Predict 페이지로 이동
          */}
            {/* <IconButton
              icon={"thumbs-up-outline"}
              color={Colors.white1}
              size={50}
              onPress={async () => {
                const data = await req_image(image);
                console.log(data);
                navigation.navigate("Predict", { data: data.result });
              }}
            /> */}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button
                style={{ width: "45%" }}
                onPress={async () => {
                  const data = await req_image(image, "after");
                  console.log(data);
                  navigation.navigate("BodyHistory", { data: data.result });
                }}
              >
                After 사진 추가
              </Button>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "45%",
                }}
              >
                <TextInput
                  style={style1.input}
                  onChangeText={setWeight}
                  value={weight}
                  placeholder="몸무게(kg)"
                  keyboardType="numeric"
                  placeholderTextColor={"#888888"}
                />
              </View>
            </View>
          </View>
          {/* 이미지 보여줌 */}
          <Image
            source={{ uri: image.uri }}
            style={{
              width: windowWidth,
              height: windowWidth,
              marginTop: (windowHeight - windowWidth) / 2,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const style1 = StyleSheet.create({
  input: {
    color: "white",
    borderBottomColor: "white",
    width: "45%",
    borderWidth: 1,
    height: 48,
  },
});
