import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking,
    Button,
} from "react-native";
import styles from "../styles/styles";
//onPress={() => openURL(bench_press["url1"].link)}
const bench_press = {
    url1: {
      name: "벤치프레스 완벽 가이드 - 강경원 방식",
      link: "https://youtu.be/A2kHURY746E?feature=shared",
      img: require("../assets/bench_thumbnail/bench1.jpg"),
    },
    url2: {
      name: "완벽한 벤치프레스 강의 [운동의 정석]",
      link: "https://youtu.be/0DsXTSHo3lU?feature=shared",
      img: require("../assets/bench_thumbnail/bench2.jpg"),
    },
    url3: {
      name: "벤치프레스 초보자를 위한 포인트 정리",
      link: "https://youtu.be/MxrdZrt6uQM?feature=shared",
      img: require("../assets/bench_thumbnail/bench3.jpg"),
    },
  };
export default function DetailScreen({ navigation }) {
    const openURL = (url) => {
        Linking.openURL(url);
      };
    return (
        <View style={styles.container}>
            <Text style={styles1.title}>운동이름</Text>
            <TouchableOpacity
                style={{ margin: 10 }}
            >
                <Image
                    source={bench_press["url1"].img}
                    style={{ width: 298, height: 235 }}
                />
            </TouchableOpacity>
            <Text style={styles1.detail}>벤치프레스 하는법...</Text>
        </View>
    );
}

const styles1 = StyleSheet.create({
    title: {
        fontSize: 64,
        fontFamily: "Roboto",
        fontWeight: "700",
        color: "#FFFFFF",
        textAlign: "center",
    },
    detail: {
        fontSize: 12,
        fontFamily: "Roboto",
        fontWeight: "700",
        color: "#FFFFFF",
        textAlign: "center",
      },

});