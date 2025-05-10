import axios, { AxiosInstance } from "axios";

const baseURL: string = "http://192.168.50.86:3000/api";

const axiosInstance: AxiosInstance = axios.create({
    baseURL,
});

console.log(`🚀 Client is using API base URL: ${baseURL}`);

export default axiosInstance;
