import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../util/auth-context";
import { login } from "../util/auth";
import { localLogin } from "../util/local-auth";

function SiginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // 로딩상태관리

  const authCtx = useContext(AuthContext); // Context 호출 변수

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password); //auth.js참고 return한 token을 받음
      authCtx.authenticate(token); // firebase가 반환한 토큰 전달
    } catch (error) {
      Alert.alert("인증 실패", "로그인 실패. 정확한지 확인해주세요");
      setIsAuthenticating(false); // 로그인 완료후 다시 false로
    }
  }

  async function localLoginHandler({ user_id, user_pw }) {
    setIsAuthenticating(true);
    try {
      const result = await localLogin(user_id, user_pw); //local-auth.js 참고 return한 data 받음

      console.log(result);
      if (result.status === 200) {
        authCtx.authenticate(result.data.token); // firebase가 반환한 토큰 전달
      } else {
        Alert.alert("인증실패", "로그인 실패. 정확한지 확인해주세요");
        setIsAuthenticating(false); // 유저 생성 완료후 다시 false로
      }
    } catch (error) {
      Alert.alert("인증실패", "Undefined error");
      setIsAuthenticating(false); // 유저 생성 완료후 다시 false로
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="로그인 중..." />;
  }

  return (
    <AuthContent
      isLogin
      onAuthenticate={loginHandler}
      onLocalAuth={localLoginHandler}
    />
  );
}

export default SiginScreen;

/* 
로그인 할때 
email : test@test.com
password : test123
으로 로그인하기
*/
