import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false, //인증 여부
  authenticate: (token) => {}, // 사용자 인증(로그인) 성공 시 트리거
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(); //인증여부확인

  //사용자 인증(로그인) 성공 시 트리거되는 함수
  function authenticate(token) {
    setAuthToken(token);
  }
  //로그아웃
  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken, //참거짓 값을 true,false로 변환
    authenticate: authenticate,
    logout: logout,
  };
  // 작업하려는 앱의 어떤 부분에서든  AuthContext 사용 가능
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
