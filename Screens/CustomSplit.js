import { View, Text } from "react-native";
import styles from "../styles/styles";
import { Colors } from "../constant/Color";
import BottomNav from "../components/ui/BottomNav";

function CustumSplit({ navigation }) {
  return (
    <View style={[styles.container]}>
      <View
        style={{
          flex: 1,
        }}>
        <Text style={[styles.text, { marginTop: 12 }]}>123</Text>
      </View>
      <BottomNav navigation={navigation} />
    </View>
  );
}

export default CustumSplit;
