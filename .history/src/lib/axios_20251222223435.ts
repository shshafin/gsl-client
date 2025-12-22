import axios from "axios";
import { getCookie } from "cookies-next";

// Create the instance
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api/v1", // Your Backend Base URL
  
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies/sessions
});

// 🛡️ Request Interceptor: Auto-attach Token
axiosInstance.interceptors.request.use(
  (config) => {
    // We get the token from the cookie named 'accessToken'
    const token = getCookie("accessToken");

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔄 Response Interceptor: Global Error Handling (Optional but recommended)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the error is 401 (Unauthorized), it usually means the token expired.
    // You could force a logout here if you wanted.
    return Promise.reject(error);
  }
);

export default axiosInstance;
