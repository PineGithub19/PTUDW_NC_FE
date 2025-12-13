import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useSessionAuthStore } from "@/store/auth-session-store";

const apiClientSession: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // 🔥 REQUIRED for session cookies
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClientSession.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const language = localStorage.getItem("lang") || "vi";
    config.headers["Accept-Language"] = language;

    return config;
  },
  (error) => Promise.reject(error)
);

apiClientSession.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useSessionAuthStore.getState().setAuthenticated(false);
    }
    return Promise.reject(error);
  }
);

export default apiClientSession;
