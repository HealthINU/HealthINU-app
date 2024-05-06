// import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Linking, TouchableOpacity, Image } from "react-native";
import * as expo_Linking from "expo-linking";
import queryString from "query-string";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../util/auth-context";
import axios from "axios";
import config from "../../config/config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL = config.URL;

export default function GoogleButton() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const handleOpenURL = async ({ url }) => {
    console.log(url);
    const query = url.split("?")[1];
    //  query string 파싱
    const query_string = queryString.parse(query);

    //  받아온 토큰 검증
    const result = await axios.get(`http://${URL}:8080/auth/verify`, {
      headers: {
        Authorization: `Bearer ${query_string.token}`,
      },
    });

    //  Verified or Unauthorized
    console.log(result.data);

    //  토큰이 검증되면 저장함 ( 그리고 자동으로 메인으로 이동함 )
    if (result.data.message === "Verified") {
      await AsyncStorage.setItem("token", query_string.token);
      authCtx.authenticate(query_string.token);
    }
  };

  login = () => {
    Linking.addEventListener("url", handleOpenURL);

    const url = expo_Linking.createURL();
    // const url = 123;
    Linking.openURL(`http://${URL}:8080/auth/google?url=${url}`).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <TouchableOpacity onPress={login}>
      <Image
        source={require("../../assets/google_button.png")}
        style={{ width: 189, height: 40, alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
}
