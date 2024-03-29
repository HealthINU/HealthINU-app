import { View, Text, FlatList, ActivityIndicator } from "react-native";
import styles from "../styles/styles";
import { useEffect, useContext, useState } from "react";

import { apiFunction } from "../util/api/api";
import { AuthContext } from "../util/auth-context";
import { Button } from "@rneui/themed";
import { Colors } from "../constant/Color";
import BottomNav from "../components/ui/BottomNav";
import { Skeleton } from "@rneui/themed";

function RankScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    if (rank) return;

    console.log(authCtx.token);
    const fetchData = async () => {
      const data = await apiFunction(authCtx.token, "get", "/info/rank");
      setRank(data);
    };
    fetchData();
  }, [rank]);

  const logRank = () => {
    console.log(rank);
  };

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
                    <Text style={{ ...styles.text, paddingRight: 32 }}>
                      {index + 1}
                    </Text>
                    <View>
                      <Text style={styles.text}>
                        {item.user_name.substring(0, 10)}
                      </Text>
                      <Text style={styles.grayText}>lv. {item.user_level}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
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
