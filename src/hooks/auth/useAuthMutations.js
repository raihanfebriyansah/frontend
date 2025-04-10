import { AuthRepository } from "@/repositories";
import { useMutation } from "@tanstack/react-query";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const useAuthMutations = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const authenticateAdmin = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await AuthRepository.loginAdmin({ username, password });
      return response;
    },
    onSuccess: (data) => {
      signIn({
        auth: {
          token: data.token,
          type: "Bearer",
        },
        userState: {
          user: data.admin,
          role: "admin",
          token: data.token,
        },
      });

      navigate("/admin/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.error("Login gagal:", error);
    },
  });

  const authenticateUser = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await AuthRepository.loginUser({ username, password });
      return response;
    },
    onSuccess: (data) => {
      signIn({
        auth: {
          token: data.token,
          type: "Bearer",
        },
        userState: {
          user: data.user,
          role: "patient",
          token: data.token,
        },
      });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(`Login gagal: ${error.response.data.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.error("Login gagal:", error);
    },
  });

  const registerUser = useMutation({
    mutationFn: async (data) => {
      const response = await AuthRepository.register(data);
      return response;
    },
    onSuccess: (data) => {
      toast.success(`Pendaftaran ${data.nama} berhasil! Silahkan lakukan login.`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    },
    onError: (error) => {
      toast.error(`Registrasi gagal: ${error.response.data.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.error("Login failed:", error);
    },
  });

  return {
    authenticateAdmin, authenticateUser, registerUser
  };
}