import axios from "axios";
import config from "../config/config.json";
const URL = config.URL;

async function authenticate(mode, user_email, user_id, user_pw, user_name) {
  const url = `http://${URL}:8080/auth/${mode}`;

  const response = await axios.post(url, {
    user_email: user_email,
    user_name: user_name,
    user_pw: user_pw,
    user_id: user_id,
  });

  console.log(response.data);
  console.log(response.status);

  return response;
}

//가입
export function createLocalUser(user_email, user_id, user_pw, user_name) {
  return authenticate("join", user_email, user_id, user_pw, user_name);
}

//로그인
export async function localLogin(user_id, user_pw) {
  return authenticate("login", user_id, user_pw);
}
