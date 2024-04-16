import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles";
import { useEffect, useContext, useState } from "react";

//  현재 화면이 focus 되어있는지 확인
import { useIsFocused } from "@react-navigation/native";

import { apiFunction } from "../util/api/api";
import { AuthContext } from "../util/auth-context";
import { Colors } from "../constant/Color";
import BottomNav from "../components/ui/BottomNav";
import IconButton from "../components/ui/IconButton";

import { Dimensions, StyleSheet } from "react-native";

import config from "../config/config";
import Button from "../components/ui/Button";
const URL = config.URL;

//  현재 날짜와 인수 date1 사이의 차이를 반환 ( 일수는 내림 처리 )
function getDateDiff(date1) {
  const today = new Date();
  const oldDate = new Date(date1);
  const diff = Math.floor((today - oldDate) / 60 / 60 / 24 / 1000);
  return diff;
}

//  랭크 화면
function BodyHistory({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [rank, setRank] = useState(null);
  const [beforeNum, setBeforeNum] = useState(null);

  //  화면이 focus 되어있는지 확인
  const isFocused = useIsFocused();

  const windowWidth = Dimensions.get("window").width;
  const style1 = createStyles(windowWidth);

  //  화면 처음 로딩시 랭크 정보 가져오기
  useEffect(() => {
    //  이미 불러왔으면 다시 불러오지 않음
    // if (rank) return;

    const fetchData = async () => {
      const data = await apiFunction(authCtx.token, "get", "/info/body");
      console.log(data.data.data);
      setRank(data.data);
      setBeforeNum(data.data.data.length - 2);
    };
    fetchData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {!rank ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <ActivityIndicator size="large" color={Colors.gray2} />
        </View>
      ) : (
        <>
          <View
            style={{
              marginTop: 16,
              marginHorizontal: 16,
              flex: 1,
            }}>
            {rank.data.length === 0 && (
              <Text style={{ ...styles.text, marginTop: 32 }}>
                기록이 없습니다.
              </Text>
            )}
            <FlatList
              data={rank.data}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => setBeforeNum(index)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: Colors.gray2,
                      marginVertical: 8,
                      padding: 16,
                      width: "100%",
                      borderRadius: 16,
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "50%",
                        alignItems: "center",
                        paddingLeft: 16,
                      }}>
                      <Image
                        source={{
                          uri: `http://${URL}:8080/${item.body_image}`,
                        }}
                        style={{
                          width: 64,
                          height: 64,
                          marginRight: 16,
                          borderRadius: 16,
                        }}
                      />
                      <View>
                        {/* 유저 이름 */}
                        <Text style={styles.text}>{item.body_date}</Text>
                        {/* 유저 레벨 */}
                        <Text style={styles.grayText}>
                          {item.body_weight} kg
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      {/* 유저 경험치 */}
                      <Text style={styles.text}>
                        {getDateDiff(item.body_date)}
                      </Text>
                      <Text style={styles.grayText}> 일전</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                ...style1.box,
              }}>
              <Text style={{ ...styles.text, marginBottom: 8 }}>Before</Text>
              <Image
                source={{
                  uri: `http://${URL}:8080/${rank.data[beforeNum]?.body_image}`,
                }}
                style={{ width: "100%", height: "100%", borderRadius: 16 }}
              />
            </View>
            <View
              style={{
                ...style1.box,
              }}>
              <>
                <Text style={{ ...styles.text, marginBottom: 8 }}>After</Text>

                <Image
                  source={{
                    uri: `http://${URL}:8080/${
                      rank.data.slice(-1)[0]?.body_image
                    }`,
                  }}
                  style={{ width: "100%", height: "100%", borderRadius: 16 }}
                />
              </>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
            <View
              style={{
                ...style1.box,
              }}>
              {rank.data.length < 2 ? (
                <Text style={style1.descText}>! 이전 기록이 없습니다</Text>
              ) : (
                <>
                  <Text style={style1.descText}>
                    {rank.data[beforeNum]?.body_weight}{" "}
                    <Text style={styles.grayText}> kg</Text>
                  </Text>
                  <Text style={style1.descText}>
                    {rank.data[beforeNum]?.body_bmi}{" "}
                    <Text style={styles.grayText}> BMI</Text>
                  </Text>
                  <Text style={style1.descText}>
                    {rank.data[beforeNum]?.body_date}{" "}
                    <Text style={styles.grayText}>
                      {" "}
                      {getDateDiff(rank.data[beforeNum]?.body_date)}
                      일전
                    </Text>
                  </Text>
                  <Button onPress={() => navigation.navigate("ChangeProfile")}>
                    기록 보기
                  </Button>
                </>
              )}
            </View>
            <View
              style={{
                ...style1.box,
              }}>
              {rank.data.length < 1 ? (
                <Text style={style1.descText}>! 이전 기록이 없습니다</Text>
              ) : (
                <>
                  <Text style={style1.descText}>
                    {rank.data.slice(-1)[0].body_weight}{" "}
                    <Text style={styles.grayText}> kg</Text>
                  </Text>
                  <Text style={style1.descText}>
                    {rank.data.slice(-1)[0].body_bmi}{" "}
                    <Text style={styles.grayText}> BMI</Text>
                  </Text>
                  <Text style={style1.descText}>
                    {rank.data.slice(-1)[0].body_date}
                    <Text style={styles.grayText}>
                      {" "}
                      {getDateDiff(rank.data.slice(-1)[0].body_date)}
                      일전
                    </Text>
                  </Text>
                </>
              )}
              <Button onPress={() => navigation.navigate("Kamera")}>
                사진 추가
              </Button>
            </View>
          </View>
        </>
      )}
      <BottomNav navigation={navigation} />
    </View>
  );
}

const createStyles = (windowWidth) =>
  StyleSheet.create({
    box: {
      backgroundColor: Colors.black,
      borderRadius: 16,
      height: (windowWidth - 48) / 2,
      width: (windowWidth - 48) / 2,
      margin: 8,
      justifyContent: "center",
    },
    descText: {
      ...styles.text,
      fontSize: 16,
      marginLeft: 8,
    },
  });

export default BodyHistory;
