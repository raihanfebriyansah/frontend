import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useProfilMutations from "@/hooks/admin/profil/useProfilMutations";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const profilFormSchema = z.object({
  image: z.any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return ACCEPTED_IMAGE_MIME_TYPES.includes(files[0]?.type);
      },
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  password: z.string().optional(),
});

const ProfilPage = () => {
  const auth = useAuthUser();
  const { updateProfil } = useProfilMutations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profilFormSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      if (values.image && values.image.length > 0) {
        formData.append('foto', values.image[0]);
      }

      if (values.password) {
        formData.append("password", values.password);
      }

      const userId = auth?.user?.id;
      if (!userId) {
        throw new Error("User ID is undefined. Please ensure the user is authenticated.");
      }

      await updateProfil.mutate({ id: userId, formData });
    }
    catch (error) {
      console.error('Registrasi gagal:', error);
    }
  };

  return (
    <section className="capitalize">
      <header className='flex items-center justify-between px-12 py-9'>
        <h1 className="text-3xl font-medium text-primary">profil administrator</h1>
      </header>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3" encType="multipart/form-data">
        <div className="content-center space-y-5 justify-items-center">
          <img src={auth.user.foto ? auth.user.foto : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="} alt={auth.user.name} className="object-cover object-center rounded-full w-[186px] bg-white" />
          <label htmlFor="file-upload" className="px-6 py-2 font-medium text-white capitalize rounded-lg custom-file-upload bg-primary">
            pilih foto
          </label>
          <input id="file-upload" type="file" {...register('image')} />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-bold">nama lengkap</h2>
            <p className="text-xl font-medium text-gray-500">{auth.user.nama}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">username</h2>
            <p className="text-xl font-medium text-gray-500">{auth.user.username}</p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xl font-bold">password baru</label>
            <input
              type="password" id="password"
              {...register('password')}
              placeholder="masukkan password baru" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize"
            />
          </div>
          <button type="submit" className="px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">simpan</button>
        </div>
      </form>
    </section>
  );
}

export default ProfilPage;