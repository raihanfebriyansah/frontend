import { SpesialisasiRepository } from "@/repositories"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';

const useSpesialisasiMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => SpesialisasiRepository.create(data),
    onSuccess: (data) => {
      toast.success(`Spesialisasi ${data.nama} berhasil ditambahkan!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["spesialisasi"]);
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
    mutationFn: ({ id, formData }) => SpesialisasiRepository.edit(id, formData),
    onSuccess: (data) => {
      toast.success(`Spesialisasi ${data.nama} berhasil diubah!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["spesialisasi"]);
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
    mutationFn: (id) => SpesialisasiRepository.remove(id),
    onSuccess: () => {
      toast.success(`Spesialisasi berhasil dihapus!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["spesialisasi"]);
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

  return { create, edit, remove };
}

export default useSpesialisasiMutations;