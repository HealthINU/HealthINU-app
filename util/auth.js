import axios from "axios";

/* 
로그인 할때 
email : test@test.com
password : test123
으로 로그인하기
*/

//개인 firebase Api key
const API_KEY = "AIzaSyCjQu6XlWyK0r3VqJB-Ei7-gO6uvXSEep8";

//firebase 인증요청 함수 , async await를 사용해서 함수 호출 시 이 함수가 response에 promise를 반환하도록 설정함
//로그인인지 가입인지 인식시키는 함수 , firebase에서 링크는 mode부분만 바뀌면 됨
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

//가입
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

//로그인
export async function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
