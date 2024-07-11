import axios from "axios";

const instance = axios.create({
    baseURL:'https://backend-robo.vercel.app/api',
    withCredentials: true
})

export default instance