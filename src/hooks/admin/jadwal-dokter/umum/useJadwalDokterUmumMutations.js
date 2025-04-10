import { JadwalDokterUmumRepository } from "@/repositories"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';

const useJadwalDokterUmumMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => JadwalDokterUmumRepository.create(data),
    onSuccess: () => {
      toast.success(`jadwal dokter umum berhasil ditambahkan!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["jadwal-dokter-umum"]);
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan: ${error.response.data}`, {
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
    mutationFn: ({ id, formData }) => JadwalDokterUmumRepository.edit(id, formData),
    onSuccess: () => {
      toast.success(`jadwal dokter umum berhasil diubah!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["jadwal-dokter-umum"]);
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
    mutationFn: (id) => JadwalDokterUmumRepository.remove(id),
    onSuccess: () => {
      toast.success(`jadwal dokter umum berhasil dihapus!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["jadwal-dokter-umum"]);
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

export default useJadwalDokterUmumMutations;