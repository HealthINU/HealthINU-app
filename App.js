//  상단바 관련 라이브러리
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
//  navigation을 import
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//  사용되는 페이지들 import
import SigninScreen from "./Screens/SigninScreen";
import SignupScreen from "./Screens/SignupScreen";
import KameraScreen from "./Screens/KameraScreen";
import MainScreen from "./Screens/MainScreen";
import PredictScreen from "./Screens/PredictScreen";
import ExerciseListScreen from "./components/Camera/ExerciseListScreen";
import DetailScreen from "./components/Camera/DetailScreen";

// Context 전용 import
import AuthContextProvider from "./util/auth-context";
import { AuthContext } from "./util/auth-context";
import ExerciseList from "./Screens/ExerciseList";
import Profile from "./Screens/Profile";
import ChangeProfile from "./Screens/ChangeProfile";
import ExerciseRecord from "./Screens/ExerciseRecordScreen";
import RankScreen from "./Screens/RankScreen";

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
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangeProfile"
        component={ChangeProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kamera"
        component={KameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseList"
        component={ExerciseList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Predict"
        component={PredictScreen}
        options={{ headerShown: false }}
      />
      {/* 화면 확인용 이동 navigate -> 수정해야함 */}
      <Stack.Screen
        name="Legacy_ExerciseList"
        component={ExerciseListScreen}
        options={{ headerShown: false }}
      />
      {/* 화면 확인용 이동 navigate -> 수정해야함 */}
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      {/* 화면 확인용 이동 navigate -> 수정해야함 */}
      <Stack.Screen
        name="ExerciseRecord"
        component={ExerciseRecord}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rank"
        component={RankScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/*인증되지 않았을시 LoginStack렌더링(로그인, 회원가입)*/}
      {!authCtx.isAuthenticated && <LoginStack />}
      {/*인증됬을 시 MainStack렌더링(메인)*/}
      {authCtx.isAuthenticated && <MainStack />}
    </NavigationContainer>
  );
}

//  navigation을 모아서 렌더링
//  로그인 Stack과 메인 Stack으로 구성됨
export default function App() {
  {
    /*Context 생성 후 사용할 Navigation Container에 해당 함수를 감싸주기*/
  }
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
