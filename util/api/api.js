import axios from "axios";

import conifg from "../../config/config.json";
const URL = conifg.URL;

// const equip = await axios.get(`http://${URL}:8080/info/equip`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

export function apiFunction(token, Oper, endPoint, data = null) {
  return axios({
    method: Oper,
    url: `http://${URL}:8080${endPoint}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      return err;
    });
}
