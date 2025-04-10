import { JadwalDokterSpesialisasiRepository } from "@/repositories"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';

const useJadwalDokterSpesialisasiMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => JadwalDokterSpesialisasiRepository.create(data),
    onSuccess: (data) => {
      toast.success(`jadwal dokter spesialisasi ${data.nama} berhasil ditambahkan!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["jadwal-dokter-spesialisasi"]);
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
    mutationFn: ({ id, formData }) => JadwalDokterSpesialisasiRepository.edit(id, formData),
    onSuccess: (data) => {
      toast.success(`jadwal dokter spesialisasi ${data.Doctor.nama} berhasil diubah!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["jadwal-dokter-spesialisasi"]);
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
    mutationFn: (id) => JadwalDokterSpesialisasiRepository.remove(id),
    onSuccess: () => {
      toast.success(`jadwal dokter spesialisasi berhasil dihapus!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["jadwal-dokter-spesialisasi"]);
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

export default useJadwalDokterSpesialisasiMutations;