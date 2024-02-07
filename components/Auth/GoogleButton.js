// import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Linking, TouchableOpacity, Image } from "react-native";
import * as expo_Linking from "expo-linking";
import queryString from "query-string";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../util/auth-context";

export default function GoogleButton() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const handleOpenURL = ({ url }) => {
    const query = url.split("?")[1];
    const query_string = queryString.parse(query);

    console.log(query_string.login);
    if (query_string.login === "true") {
      authCtx.authenticate(query_string.token);
    } else {
      navigation.navigate("Signup");
    }
  };

  login = () => {
    Linking.addEventListener("url", handleOpenURL);

    const url = expo_Linking.createURL();
    // const url = 123;
    Linking.openURL(
      `http://www.healthinu.r-e.kr:8080/auth/google?url=${url}`
    ).catch((err) => console.error("An error occurred", err));
  };

  return (
    <TouchableOpacity onPress={login}>
      <Image
        source={require("../../assets/google.png")}
        style={{ width: 50, height: 50, alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
}
