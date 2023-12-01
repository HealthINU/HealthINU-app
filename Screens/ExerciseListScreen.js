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
// 영상링크
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
  
const leg_extension = {
  url1: {
    name: "가장 기본이 되는 필수 하체운동 l 레그 익스텐션",
    link: "https://youtu.be/mS9iwXhycJI?feature=shared",
    img : require("../assets/leg_extension_thumbnail/leg_ex1.jpg"),
  },
  url2: {
    name: "정상급 코치들의 레그 익스텐션 꿀팁 정리",
    link: "https://youtu.be/cot__Hw59MU?feature=shared",
    img : require("../assets/leg_extension_thumbnail/leg_ex2.jpg"),
  },
  url3: {
    name: "여자 레그익스텐션 중요한 4가지 포인트 (무릎,상체위치,손잡이,횟수)", 
    link: "https://youtu.be/NNECo3YLVl8?feature=shared",
    img : require("../assets/leg_extension_thumbnail/leg_ex3.jpg"),
  },
}
const lat_pull_down = {
  url1: {
    name: "도대체 랫풀다운은 어떻게 하는 건가요? || 랫풀다운 제대로 하기",
    link: "https://youtu.be/2K2WCGstHOY?feature=shared",
    img : require("../assets/lat_pull_down_thumbnail/lat_pull_1.jpg"),
  },
  url2: {
    name: "이렇게 해야 허리가 가늘어 보입니다!! [랫풀다운 LAT PULL DOWN]",
    link: "https://youtu.be/rhB1cEvS_bo?feature=shared",
    img : require("../assets/lat_pull_down_thumbnail/lat_pull_2.jpg"),
  },
  url3: {
    name: "랫풀다운 도대체 어떻게 해야 할까!? 광배근으로 당기는 방법! (등 운동, 상체 프레임 넓히는 방법, 운동 자세)", 
    link: "https://youtu.be/aPSnJ7_Zlxk?feature=shared",
    img : require("../assets/lat_pull_down_thumbnail/lat_pull_3.jpg"),
  },
};

export default function ExerciseListScreen({ navigation }) {
  const openURL = (url) => {
    Linking.openURL(url);
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles1.title}>벤치 프레스</Text>
      <Text style={styles1.subtitle}>{bench_press["url1"].name}</Text>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
            navigation.navigate("Detail");
          }}
      >
        <Image
          source={bench_press["url1"].img}
          style={{ width: 248, height: 143 }}
        />
      </TouchableOpacity>
      <Text style={styles1.subtitle}>{bench_press["url2"].name}</Text>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
            navigation.navigate("Detail");
          }}
      >
        <Image
          source={bench_press["url2"].img}
          style={{ width: 248, height: 143 }}
        />
      </TouchableOpacity>
      <Text style={styles1.subtitle}>{bench_press["url3"].name}</Text>
      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => {
            navigation.navigate("Detail");
          }}
      >
        <Image
          source={bench_press["url3"].img}
          style={{ width: 248, height: 143 }}
        />
      </TouchableOpacity>
      {/* 메인 화면으로 이동하는 버튼 */}
      <Button
        title="Main"
        onPress={() =>
          navigation.navigate("MainStack", {
            screen: "Main",
            initial: false,
          })
        }
      />
      {/* 상단바 밝게 */}
      <StatusBar style="light" />
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
  subtitle: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
