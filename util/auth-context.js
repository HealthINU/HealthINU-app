import { createContext, useState, useContext, useReducer } from "react";
import axios from "axios";

import conifg from "../config/config.json";
const URL = conifg.URL;

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false, //인증 여부
  authenticate: (token) => {}, // 사용자 인증(로그인) 성공 시 트리거
  logout: () => {},
  info: null,
  info_dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "setRecord":
      return { ...state, record: action.payload };
    case "setOwn":
      return { ...state, own: action.payload };
    case "setEquipment":
      return { ...state, equipment: action.payload };
    default:
      return state;
  }
};

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(); //인증여부확인
  //  각종 정보 저장
  const [info, info_dispatch] = useReducer(reducer, {
    user: null,
    record: null,
    own: null,
    equipment: null,
  });

  //사용자 인증(로그인) 성공 시 트리거되는 함수
  async function authenticate(token) {
    //  로그인, 회원가입하면 각종 정보들 가져옴

    try {
      const user = await axios.get(`http://${URL}:8080/info/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const equip = await axios.get(`http://${URL}:8080/info/equip`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // const record = await axios.get(`http://${URL}:8080/info/record`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // const own = await axios.get(`http://${URL}:8080/info/own`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      info_dispatch({ type: "setUser", payload: user.data });
      info_dispatch({ type: "setEquipment", payload: equip.data.data });
      // info_dispatch({ type: "setRecord", payload: record.data });
      // info_dispatch({ type: "setOwn", payload: own.data });
    } catch (e) {
      console.log(e);
    }

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
    info: info,
    info_dispatch: info_dispatch,
  };
  // 작업하려는 앱의 어떤 부분에서든  AuthContext 사용 가능
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
