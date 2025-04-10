import { AdminRepository } from '@/repositories';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useProfilMutations = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const updateProfil = useMutation({
    mutationFn: ({ id, formData }) => {
      if (!id) {
        throw new Error("ID is required to update the profile.");
      }
      return AdminRepository.update(id, formData);
    },
    onSuccess: (data) => {
      toast.success(`Profil berhasil diubah!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      signIn({
        auth: {
          token: Cookies.get("_auth"),
          type: "Bearer",
        },
        userState: {
          user: data,
          role: "admin",
          token: Cookies.get("_auth"),
        },
      });
      navigate("/admin/profil");
    },
    onError: (error) => {
      toast.error(`Gagal mengubah profil: ${error.message}`, {
        duration: 4000,
        position: 'top-center',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    },
  })

  return { updateProfil }
};

export default useProfilMutations