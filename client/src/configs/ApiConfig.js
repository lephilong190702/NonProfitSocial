// import axios from "axios";
// import cookie from "react-cookies";

// export const SERVER_CONTEXT = "http://localhost:8080/server";

// export const authApi = () => {
//   return axios.create({
//     baseURL: SERVER_CONTEXT,
//     headers: {
//       Authorization: cookie.load("token"),
//     },
//   });
// };

// export default axios.create({
//   baseURL: SERVER_CONTEXT,
// });

import axios from "axios";

const SERVER_CONTEXT = ""

export const endpoints = {
    "newsCategory": `${SERVER_CONTEXT}/api/ncategories/`,
    "news": `${SERVER_CONTEXT}/api/news/`
}

export default axios.create({
    baseURL: "http://localhost:9090"
})