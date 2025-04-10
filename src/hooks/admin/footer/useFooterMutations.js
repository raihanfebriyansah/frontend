import { FooterRepository } from "@/repositories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useFooterMutations = () => {
  const queryClient = useQueryClient();

  const update = useMutation({
    mutationFn: (data) => FooterRepository.update(data),
    onSuccess: () => {
      toast.success(`Footer berhasil diupdate!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      queryClient.invalidateQueries(["footer"]);
    },
    onError: (error) => {
      toast.error(`Gagal memperbarui footer: ${error.message}`, {
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

  return {update};

};

export default useFooterMutations