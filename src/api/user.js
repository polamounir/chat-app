import api from "../utils/api";
import Cookies from "js-cookie";

export const loginUser = async (formData) => {
  try {
    const { data } = await api.post("http://localhost:3000/api/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    console.log("Login response:", data);
    const accessToken = data.data.data.accessToken;
    const refreshToken = data.data.data.refreshToken;
    const email = data.data.data.email;
    const userName = data.data.data.name;

    Cookies.set("accessToken", accessToken, {
      expires: 1, // 1 day
      secure: true, // only over HTTPS
      sameSite: "Strict",
    });

    Cookies.set("refreshToken", refreshToken, {
      expires: 7, // 7 days
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("email", email, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("userName", userName, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    return {
      error: false,
      message: data.data.message,
      data: data.data,
    };
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.data?.message || "Login failed",
    };
  }
};

export const getUserData = async () => {
  const { data } = await api.get("/auth/me");
  console.log("User data:", data);
  return data;
};
