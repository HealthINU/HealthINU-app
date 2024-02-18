import axios from "axios";
import config from "../config/config.json";
const URL = config.URL;

//로그인 정보를 넣음
async function authenticate(mode, { user_email, user_id, user_pw, user_name }) {
  const url = `http://${URL}:8080/auth/${mode}`;
  console.log(url);

  let data;
  if (mode == "login") {
    data = { user_id, user_pw };
  } else if (mode == "join") {
    data = {
      user_email,
      user_id,
      user_pw,
      user_name,
    };
  }

  const response = await axios.post(url, data);

  return response;
}

//운동 정보를 넣음
async function Information(authCtx, { user_name, user_height, user_weight }) {
  const url = `http://${URL}:8080/info/user`;

  const data = {
    user_name,
    user_height,
    user_weight,
  };

  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${authCtx.token}`,
    },
  });

  authCtx.info_dispatch({ type: "setUser", payload: data });

  return response;
}

//가입
export function createLocalUser(user_email, user_id, user_pw, user_name) {
  return authenticate("join", { user_email, user_id, user_pw, user_name });
}

//로그인
export async function localLogin(user_id, user_pw) {
  return authenticate("login", { user_id, user_pw });
}
//프로필 수정
export async function editProfile(
  authCtx,
  user_name,
  user_height,
  user_weight
) {
  return Information(authCtx, { user_name, user_height, user_weight });
}
