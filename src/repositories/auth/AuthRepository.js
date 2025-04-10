import { authService } from "@/services";

export const loginAdmin = async (credentials) => {
  const response = await authService.LoginAdmin(credentials);
  return response;
}

export const loginUser = async (credentials) => {
  const response = await authService.loginUser(credentials);
  return response;
}

export const register = async (data) => {
  const { name, ...others } = data;
  const response = await authService.register({
    nama: name,
    ...others
  });
  return response;
}