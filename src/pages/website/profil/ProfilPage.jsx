import usePatientMutations from "@/hooks/website/patient/usePatientMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const patientFormSchema = z.object({
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
});

const ProfilPage = () => {
  const auth = useAuthUser();
  const { uploadFoto } = usePatientMutations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      await uploadFoto.mutate({ id: auth.user.id, formData: data });
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="capitalize">
      <header className="content-center h-56 text-center bg-primary sm:py-10 sm:px-8 md:px-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Profil Pengguna</h1>
      </header>
      <form
        method="post"
        encType="multipart/form-data"
        className="grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-2 md:px-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center space-y-5">
          <img
            src={auth.user.foto ? `${import.meta.env.VITE_BACKEND_BASE_URL}/uploads/patient/${auth.user.foto}` : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}
            alt={auth.user.name}
            className="object-cover object-center rounded-full w-32 sm:w-[186px] bg-white"
          />
          <label htmlFor="file-upload" className="px-6 py-2 mt-4 font-medium text-white capitalize rounded-lg bg-primary">
            Pilih Foto
          </label>
          <input
            id="file-upload"
            {...register("image")}
            type="file"
            className="hidden"
          />
          {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold">Nama Lengkap</h2>
            <p className="text-lg text-gray-500">{auth.user.nama}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Username</h2>
            <p className="text-lg text-gray-500">{auth.user.username}</p>
          </div>

          <button
            type="submit"
            className="px-6 py-2 mt-6 font-bold text-white capitalize rounded-lg bg-primary"
          >
            Simpan
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProfilPage;
