import { Camera, CameraType } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Kamera() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useState(null);
  const cameraRef = useRef(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      requestPermission(cameraStatus.status === "granted");
    })();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera style={styles.camera} type={type} ref={cameraRef} flashMode={flash}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
        }}
      ></View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 500,
    height: 500,
  },
});
