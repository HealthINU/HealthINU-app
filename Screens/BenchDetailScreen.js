import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, Button } from "react-native";
import styles from "../styles/styles";
// 영상링크
const url_list = {
    url1: {
        name: "벤치프레스 완벽 가이드 - 강경원 방식",
        link: "https://youtu.be/A2kHURY746E?feature=shared",
    },
    url2: {
        name: "완벽한 벤치프레스 강의 [운동의 정석]",
        link: "https://youtu.be/0DsXTSHo3lU?feature=shared",
    },
    url3: {
        name: "벤치프레스 초보자를 위한 포인트 정리", // 원래 제목 더 긴데 텍스트 크기 맞추려고 줄임
        link: "https://youtu.be/MxrdZrt6uQM?feature=shared",
    },

};
export default function BenchDetailScreen({ navigation }) {
    const openURL = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={styles1.title}>벤치 프레스</Text>
            <Text style={styles1.subtitle}>{url_list['url1'].name}</Text>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => openURL(url_list['url1'].link)}>
                <Image
                    source={require("../assets/bench_thumbnail/bench1.jpg")}
                    style={{ width: 248, height: 143 }}
                />
            </TouchableOpacity>
            <Text style={styles1.subtitle}>{url_list['url2'].name}</Text>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => openURL(url_list['url2'].link)}>
                <Image
                    source={require("../assets/bench_thumbnail/bench2.jpg")}
                    style={{ width: 248, height: 143 }}
                />
            </TouchableOpacity>
            <Text style={styles1.subtitle}>{url_list['url3'].name}</Text>
            <TouchableOpacity style={{ margin: 10 }} onPress={() => openURL(url_list['url3'].link)}>
                <Image
                    source={require("../assets/bench_thumbnail/bench3.jpg")}
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
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        fontFamily: 'Roboto',
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
    }
});

