import { PublicReservasiRepository, ReservasiRepository } from "@/repositories"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useReservasiMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const reservasi = useMutation({
    mutationFn: (data) => PublicReservasiRepository.reservasi(data),
    onSuccess: () => {
      toast.success(`reservasi berhasil!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["reservasi"]);
      navigate('/');
    },
    onError: (error) => {
      toast.error(`Gagal melakukan reservasi: ${error.message}`, {
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

  const create = useMutation({
    mutationFn: (data) => ReservasiRepository.create(data),
    onSuccess: () => {
      toast.success(`Reservasi berhasil dibuat!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["reservasi"]);
    },
    onError: (error) => {
      toast.error(`Gagal membuat reservasi: ${error.message}`, {
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
    mutationFn: (data) => ReservasiRepository.edit(data),
    onSuccess: () => {
      toast.success(`Reservasi berhasil diedit!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["reservasi"]);
    },
    onError: (error) => {
      toast.error(`Gagal mengedit reservasi: ${error.message}`, {
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
    mutationFn: (id) => ReservasiRepository.remove(id),
    onSuccess: () => {
      toast.success(`Reservasi berhasil dihapus!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["reservasi"]);
    },
    onError: (error) => {
      toast.error(`Gagal menghapus reservasi: ${error.message}`, {
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

  return { reservasi, create, edit, remove };
}

export default useReservasiMutations;