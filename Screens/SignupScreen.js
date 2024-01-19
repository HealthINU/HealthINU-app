import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../util/auth-context";
import { createUser } from "../util/auth";

function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false); // 로딩상태관리

  const authCtx = useContext(AuthContext); // Context 호출 변수

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password); //auth.js참고 return한 token을 받음
      authCtx.authenticate(token); // firebase가 반환한 토큰 전달
    } catch (error) {
      Alert.alert(
        "인증실패",
        "이미 존재하는 유저이거나 입력값의 오류입니다.다시 시도해주세요"
      );
      setIsAuthenticating(false); // 유저 생성 완료후 다시 false로
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="유저 생성 중..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignUpScreen;
