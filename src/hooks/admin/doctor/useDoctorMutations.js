import { DoctorRepository } from "@/repositories"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from 'react-hot-toast';

const useDoctorMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => DoctorRepository.create(data),
    onSuccess: (data) => {
      toast.success(`dokter ${data.nama} berhasil ditambahkan!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["doctor"]);
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
    mutationFn: ({ id, formData }) => DoctorRepository.edit(id, formData),
    onSuccess: (data) => {
      toast.success(`dokter ${data.nama} berhasil diubah!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["doctor"]);
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
    mutationFn: (id) => DoctorRepository.remove(id),
    onSuccess: () => {
      toast.success(`dokter berhasil dihapus!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["doctor"]);
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

export default useDoctorMutations;