import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://chat-app-sever-production.up.railway.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for refreshing token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        // Save new tokens

        Cookies.set("accessToken", data.data.accessToken, {
          expires: 3, // 1 day
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refreshToken", data.data.refreshToken, {
          expires: 7, // 7 days
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("email", data.data.email, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("userName", data.data.name, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        // Retry original request with new token
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.message);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
