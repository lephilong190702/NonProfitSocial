import axios from "axios";

const SERVER_CONTEXT = ""

export const endpoints = {
    "newsCategory": `${SERVER_CONTEXT}/api/ncategories/`,
    "news": `${SERVER_CONTEXT}/api/news/`
}

export default axios.create({
    baseURL: "http://localhost:9090"
})