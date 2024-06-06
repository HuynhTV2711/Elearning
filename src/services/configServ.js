import axios from 'axios'
import { getLocal } from '../utils/local'

const dataUser = getLocal("user_infor")
export const https =  axios.create({
    baseURL: "https://elearningnew.cybersoft.edu.vn",
    headers: {
        Authorization :`Bearer ${dataUser ? dataUser.accessToken : ""}`,
        TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOSIsIkhldEhhblN0cmluZyI6IjMwLzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNzAyNzIwMDAwMCIsIm5iZiI6MTY5MjI5MTYwMCwiZXhwIjoxNzE3MTc0ODAwfQ.7MW8E_eXXd0bcbNFchNRQTlWpRBVvM0yUAkLRSo12ws',
    },
    timeout: 15000,
})