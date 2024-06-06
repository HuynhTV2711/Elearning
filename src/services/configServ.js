import axios from 'axios'
import { getLocal } from '../utils/local'

const dataUser = getLocal("user_infor")
export const https =  axios.create({
    baseURL: "https://elearningnew.cybersoft.edu.vn",
    headers: {
        Authorization :`Bearer ${dataUser ? dataUser.accessToken : ""}`,
        TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzgiLCJIZXRIYW5TdHJpbmciOiIxNC8wNy8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MjA5MTUyMDAwMDAiLCJuYmYiOjE3MDI0ODY4MDAsImV4cCI6MTcyMTA2MjgwMH0.cB5XSbdlq0lzL-wmbcuAyvlRLMYFWmr20ODRWN5rPZc',
    },
    timeout: 15000,
})