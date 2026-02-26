import axios from "axios";
import { getCookie } from "cookies-next";

// Environment variable theke base URL nibe, na thakle default localhost dhorbe
const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5007/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🛡️ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 🔄 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized handling ekhane korte paren
    return Promise.reject(error);
  },
);

export default axiosInstance;
