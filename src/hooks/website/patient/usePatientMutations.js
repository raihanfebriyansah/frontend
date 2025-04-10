import { PatientRepository } from "@/repositories"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const usePatientMutations = () => {
  const queryClient = useQueryClient();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const create = useMutation({
    mutationFn: (data) => PatientRepository.create(data),
    onSuccess: (data) => {
      toast.success(`pasien ${data.nama} berhasil ditambahkan!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["patient"]);
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan: ${error.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  });

  const edit = useMutation({
    mutationFn: ({ id, formData }) => PatientRepository.edit(id, formData),
    onSuccess: (data) => {
      toast.success(`pasien ${data.nama} berhasil diubah!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["patient"]);
    },
    onError: (error) => {
      toast.error(`Gagal mengubah: ${error.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  });

  const remove = useMutation({
    mutationFn: (id) => PatientRepository.remove(id),
    onSuccess: () => {
      toast.success(`pasien berhasil dihapus!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["patient"]);
    },
    onError: (error) => {
      toast.error(`Gagal menghapus: ${error.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  });

  const uploadFoto = useMutation({
    mutationFn: ({ id, formData }) => PatientRepository.uploadFoto(id, formData),
    onSuccess: (data) => {
      toast.success(`pasien ${data.nama} berhasil diubah!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["patient"]);
      signIn({
        auth: {
          token: Cookies.get("_auth"),
          type: "Bearer",
        },
        userState: {
          user: data,
          role: "patient",
          token: Cookies.get("_auth"),
        },
      });
      navigate("/user/profile");
    },

    onError: (error) => {
      toast.error(`Gagal mengubah: ${error.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  });

  return { create, edit, remove, uploadFoto };
}

export default usePatientMutations;