//  navigation을 import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//  상단바 관련 라이브러리
//  import { StatusBar } from "expo-status-bar";

//  사용되는 페이지들 import
import SigninScreen from "./Screens/SigninScreen";
import SignupScreen from "./Screens/SignupScreen";
import KameraScreen from "./Screens/KameraScreen";
import MainScreen from "./Screens/MainScreen";
import PredictScreen from "./Screens/PredictScreen";

//  Stack Navigator 생성
const Stack = createStackNavigator();

//  로그인 관련 Stack Navigator
//  로그인, 회원가입 페이지로 구성됨
const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

//  메인 관련 Stack Navigator
//  메인, 카메라, 기구 예측 페이지로 구성됨
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kamera"
        component={KameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Predict"
        component={PredictScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

//  navigation을 모아서 렌더링
//  로그인 Stack과 메인 Stack으로 구성됨
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginStack"
          component={LoginStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
