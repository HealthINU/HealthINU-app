import { View, Text, FlatList, ActivityIndicator } from "react-native";
import styles from "../styles/styles";
import { useEffect, useContext, useState } from "react";

import { apiFunction } from "../util/api/api";
import { AuthContext } from "../util/auth-context";
import { Colors } from "../constant/Color";
import BottomNav from "../components/ui/BottomNav";

//  랭크 화면
function RankScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [rank, setRank] = useState(null);

  //  화면 처음 로딩시 랭크 정보 가져오기
  useEffect(() => {
    //  이미 불러왔으면 다시 불러오지 않음
    if (rank) return;

    const fetchData = async () => {
      const data = await apiFunction(authCtx.token, "get", "/info/rank");
      setRank(data);
    };
    fetchData();
  }, [rank]);

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
            <FlatList
              data={rank.data}
              renderItem={({ item, index }) => (
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
                    {/* 순위 표시 */}
                    <Text style={{ ...styles.text, paddingRight: 32 }}>
                      {index + 1}
                    </Text>
                    <View>
                      {/* 유저 이름 */}
                      <Text style={styles.text}>
                        {item.user_name.substring(0, 10)}
                      </Text>
                      {/* 유저 레벨 */}
                      <Text style={styles.grayText}>lv. {item.user_level}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    {/* 유저 경험치 */}
                    <Text style={styles.text}>{item.user_exp}</Text>
                    <Text style={styles.grayText}> pts.</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </>
      )}
      <BottomNav navigation={navigation} />
    </View>
  );
}

export default RankScreen;
