import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = ""
const SERVER = "http://localhost:9090"
// const SERVER="https://nonprofit.southeastasia.cloudapp.azure.com"

export const endpoints = {
    "newsCategory": `${SERVER_CONTEXT}/api/ncategories/`,
    "news": `${SERVER_CONTEXT}/api/news/`,
    "search": `${SERVER_CONTEXT}/api/news/search`,
    "reply-news": (newsId) => `${SERVER_CONTEXT}/api/ncategories/${newsId}/news/`,
    "project": `${SERVER_CONTEXT}/api/projects/`,
    "projectCategory": `${SERVER_CONTEXT}/api/pcategories/`,
    "images": (projectId) => `${SERVER_CONTEXT}/api/projects/images/${projectId}`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "profile": `${SERVER_CONTEXT}/api/profile/`,
    "register": `${SERVER_CONTEXT}/api/register/`,
    "volunteer": `${SERVER_CONTEXT}/api/volunteer/`,
    "details": (newsId) => `${SERVER_CONTEXT}/api/news/${newsId}`,
    "details-project": (projectId) => `${SERVER_CONTEXT}/api/projects/${projectId}`,
    "comments": (newsId) => `${SERVER_CONTEXT}/api/news/${newsId}/comments/`,
    "replies": (parentId) => `${SERVER_CONTEXT}/api/news-comment/${parentId}/replies/`,
    "add-comment": `${SERVER_CONTEXT}/api/news-comment/`,
    "news-comments": (commentId) => `${SERVER_CONTEXT}/api/news-comment/${commentId}`,
    "skill": `${SERVER_CONTEXT}/api/skills/`,
    "post": `${SERVER_CONTEXT}/api/posts/`,
    "search-post": `${SERVER_CONTEXT}/api/posts/search`,
    "public-posts": `${SERVER_CONTEXT}/api/public-posts/`,
    "private-posts": `${SERVER_CONTEXT}/api/private-posts/`,
    "active-post":(postId) => `${SERVER_CONTEXT}/api/post/${postId}`,
    "delete-post":(postId) => `${SERVER_CONTEXT}/api/posts/${postId}`,
    "update-post":(postId) => `${SERVER_CONTEXT}/api/posts/${postId}`,
    "post-image":(postId) => `${SERVER_CONTEXT}/api/post/images/${postId}`,
    "react": `${SERVER_CONTEXT}/api/reaction/`,
    "react-post": (postId) => `${SERVER_CONTEXT}/api/reaction/${postId}`,
    "post-comment": `${SERVER_CONTEXT}/api/post-comment/`,
    "edit-comment": (commentId) => `${SERVER_CONTEXT}/api/post-comment/${commentId}`,
    "report-post": `${SERVER_CONTEXT}/api/report/`,
    "vn-pay": (projectId) => `${SERVER_CONTEXT}/api/projects/${projectId}/donate/`,
    "callback": (projectId) => `${SERVER_CONTEXT}/api/callback/${projectId}`,
    "donate": (projectId) => `${SERVER_CONTEXT}/api/submitOrder/${projectId}`,
    "user": `${SERVER_CONTEXT}/api/users/`,
    "userId": (userId) => `${SERVER_CONTEXT}/api/users/${userId}`,
    "chat": (userId) => `${SERVER_CONTEXT}/api/chat/${userId}`,
    "replies-post": (parentId) => `${SERVER_CONTEXT}/api/post-comment/${parentId}/replies/`,
    "edit-replies": (replyId) => `${SERVER_CONTEXT}/api/post-comment/replies/${replyId}`,
    "comment-post": (postId) => `${SERVER_CONTEXT}/api/post/${postId}/comments/`,
    "statistic": `${SERVER_CONTEXT}/api/export/`,
    "contributor-post": (postId) => `${SERVER_CONTEXT}/api/contributions/${postId}`,
    "forgot-password": `${SERVER_CONTEXT}/api/forgot-password/`,
    "set-password": `${SERVER_CONTEXT}/api/set-password/`,
    "create-room": `${SERVER_CONTEXT}/api/create-room/`,
    "join-room": (roomCode) => `${SERVER_CONTEXT}/api/rooms/${roomCode}/join/`,
    "address-project-all": `${SERVER_CONTEXT}/api/addresses/`,
    "address-project": (projectId) => `${SERVER_CONTEXT}/api/${projectId}/addresses/`,
    "post-address": (projectId) => `${SERVER_CONTEXT}/api/${projectId}/address/`,
    "check-admin-role": (userId) => `${SERVER_CONTEXT}/api/check-admin-role/${userId}`,
    "check-employee-role": (userId) => `${SERVER_CONTEXT}/api/check-employee-role/${userId}`,
    "check-shipper-role": (userId) => `${SERVER_CONTEXT}/api/check-shipper-role/${userId}`,
    "tag": `${SERVER_CONTEXT}/api/tags/`,
    // "tags": (name) => `${SERVER_CONTEXT}/api/tags/${name}`,
    "notification": (userId) => `${SERVER_CONTEXT}/api/notifications/${userId}`,
    "read-noti": (userId) => `${SERVER_CONTEXT}/api/mark-as-read/${userId}`,
    "post-tags": (projectId) => `${SERVER_CONTEXT}/api/post/tags/${projectId}`,
    "post-images": (projectId) => `${SERVER_CONTEXT}/api/post/images/${projectId}`,
    "upload-project": `${SERVER_CONTEXT}/api/upload-project/`,
    "donate-item": (projectId) => `${SERVER_CONTEXT}/api/donateItem/${projectId}`,
    "transport": (shipperId) => `${SERVER_CONTEXT}/api/transport/${shipperId}`,
    "other-news": `${SERVER_CONTEXT}/api/other-news/`,
    "feedback-project": (projectId) => `${SERVER_CONTEXT}/api/feedback/${projectId}`,

}

export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      'Authorization': cookie.load("token"),
    },
  });
};

export default axios.create({
    baseURL: SERVER
})