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
    "newsId": (newsId) => `${SERVER_CONTEXT}/api/ncategories/${newsId}/news/`,
    "project": `${SERVER_CONTEXT}/api/projects/`,
    "projectCategory": `${SERVER_CONTEXT}/api/pcategories/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "profile": `${SERVER_CONTEXT}/api/profile/`,
    "register": `${SERVER_CONTEXT}/api/register/`,
    "volunteer": `${SERVER_CONTEXT}/api/volunteer/`,
    "project": `${SERVER_CONTEXT}/api/projects/`,
    "details": (newsId) => `${SERVER_CONTEXT}/api/news/${newsId}`,
    "details-project": (projectId) => `${SERVER_CONTEXT}/api/projects/${projectId}`,
    "comments": (newsId) => `${SERVER_CONTEXT}/api/news/${newsId}/comments/`,
    "replies": (parentId) => `${SERVER_CONTEXT}/api/news-comment/${parentId}/replies/`,
    "add-comment": `${SERVER_CONTEXT}/api/news-comment/`,
    "skill": `${SERVER_CONTEXT}/api/skills/`,
    "post": `${SERVER_CONTEXT}/api/posts/`,
    "react": `${SERVER_CONTEXT}/api/reaction/`,
    "react-post": (postId) => `${SERVER_CONTEXT}/api/reaction/${postId}`,
    "post-comment": `${SERVER_CONTEXT}/api/post-comment/`,
    "report-post": `${SERVER_CONTEXT}/api/report/`,
    "vn-pay": (projectId) => `${SERVER_CONTEXT}/api/projects/${projectId}/donate/`,
    "user": `${SERVER_CONTEXT}/api/users/`,
    "userId": (userId) => `${SERVER_CONTEXT}/api/users/${userId}`,
    "chat": (userId) => `${SERVER_CONTEXT}/api/chat/${userId}`,
    "replies-post": (parentId) => `${SERVER_CONTEXT}/api/post-comment/${parentId}/replies/`,
    "comment-post": (postId) => `${SERVER_CONTEXT}/api/post/${postId}/comments/`,
}

export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      'Authorization': cookie.load("token")
    },
  });
};

export default axios.create({
    baseURL: SERVER
})