import { PublicRiwayatRepository } from "@/repositories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useRiwayatMutations = (id) => {
  const queryClient = useQueryClient();

  const cancelReservasi = useMutation({
    mutationFn: (id) => PublicRiwayatRepository.cancelReservasi(id),
    onSuccess: () => {
      toast.success(`Batalkan reservasi berhasil!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries(["riwayat"]);
    },
  });
  const getAntrian = useMutation({
    mutationFn: (id) => PublicRiwayatRepository.getAntrian(id),
    onSuccess: (data) => {
      queryClient.setQueryData(["riwayat", id], data);
    },
    onError: (error) => {
      console.error("Error fetching antrian:", error);
    },
  });

  return {
    cancelReservasi,
    getAntrian,
  };
}

export default useRiwayatMutations