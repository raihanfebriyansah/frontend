import api from "../api";
import Cookies from 'js-cookie';

export const LoginAdmin = async (data) => {
  try {
    const response = await api.post("/auth/admin/login", data);
    Cookies.set('_auth', response.data.token, {
      expires: 7,
      secure: true,
      httpOnly: true
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    Cookies.set('_auth', response.data.token, { expires: 7 });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
export const register = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
