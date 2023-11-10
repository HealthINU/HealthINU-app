import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from "react-native";

import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Button, ButtonGroup, withTheme, Textrn } from "@rneui/themed";
import styles from "../styles/styles";

export default function SignupScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [signin, setSign] = useState(false);
  const [id, setId] = useState(null);
  const [cid, setCid] = useState(null);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#000000",
      }}
    >
      <ImageBackground
        source={require("../assets/gym1.gif")}
        style={{ width: "100%", height: 205 }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,1.0)"]}
          style={{ width: "100%", height: "100%" }}
        />
        <Text
          style={{
            ...styles.text,
            width: "50%",
            textAlign: "center",
            alignSelf: "center",
            fontSize: 32,
            position: "absolute",
            marginTop: 96,
          }}
        >
          HealthINU
        </Text>
      </ImageBackground>

      <Text
        style={{
          ...styles.text,
          marginBottom: 32,
          width: "50%",
          textAlign: "center",
          alignSelf: "center",
        }}
      >
        {signin ? "Sign in" : "Sign up"}
      </Text>
      <View
        style={{
          width: "100%",
          borderTopWidth: 1,
          borderColor: "#888888",
          marginBottom: 4,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888888"
          onChangeText={(e) => setId(e)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888888"
          onChangeText={(e) => setCid(e)}
        />
      </View>

      <Button
        title="SING UP"
        loading={false}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "#007aff",
          borderRadius: 39,
          height: 40,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 16 }}
        containerStyle={{
          width: "100%",
          marginBottom: 16,
        }}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 32,
          paddingHorizontal: 64,
        }}
      >
        <Text
          style={{
            ...styles.text,
            borderColor: "#007aff",
            fontSize: 14,
          }}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          SIGN IN
        </Text>
        <Text
          style={{
            ...styles.text,
            borderBottomWidth: 2,
            borderColor: "#007aff",
            fontSize: 14,
          }}
        >
          SIGN UP
        </Text>
      </View>
      <Button
        title="Main"
        onPress={() =>
          navigation.navigate("MainStack", {
            screen: "Main",
            initial: false,
          })
        }
      />
      <StatusBar style="light" />
    </ScrollView>
  );
}
