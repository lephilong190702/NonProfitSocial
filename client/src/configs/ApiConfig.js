// import axios from "axios";
// import cookie from "react-cookies";

// export const SERVER_CONTEXT = "http://localhost:8080/server";

// export const authApi = () => {
//   return axios.create({
//     baseURL: SERVER_CONTEXT,
//     headers: {
    //   Authorization: cookie.load("token"),
//     },
//   });
// };

// export default axios.create({
//   baseURL: SERVER_CONTEXT,
// });

import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = ""
const SERVER = "http://localhost:9090"

export const endpoints = {
    "newsCategory": `${SERVER_CONTEXT}/api/ncategories/`,
    "news": `${SERVER_CONTEXT}/api/news/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "profile-by-id": `${SERVER_CONTEXT}/api/profile/?profile=`,
    
}

export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      "Authorization": cookie.load("token"),
    },
  });
};

export default axios.create({
    baseURL: SERVER
})