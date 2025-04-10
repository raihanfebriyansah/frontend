import { useAuthMutations } from "@/hooks/auth/useAuthMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username kurang dari 3 karakter")
    .max(16, "Username lebih dari 16 karakter")
    .regex(/^[a-z0-9]+$/, "Username hanya boleh berisi huruf kecil dan angka"),
  password: z.string().min(8, "Password kurang dari 8 karakter"),
});

const LoginPage = () => {
  const { authenticateUser } = useAuthMutations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await authenticateUser.mutate(data);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-full px-4 py-10 md:px-32">
      <form
        method="post"
        className="flex flex-col w-full max-w-md p-6 space-y-4 capitalize bg-white rounded-lg shadow-lg md:p-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="text-center">
          <h1 className="text-2xl font-bold md:text-4xl text-primary">masuk</h1>
        </header>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-lg font-medium md:text-xl text-primary">
            username
          </label>
          <input
            type="text"
            id="username"
            {...register("username")}
            placeholder="masukkan username"
            className="w-full py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize"
            disabled={authenticateUser.isPending}
          />
          {errors.username && (
            <small className="text-sm text-red-500">{errors.username.message}</small>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg font-medium md:text-xl text-primary">
            kata sandi
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="masukkan kata sandi"
            className="w-full py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize"
            disabled={authenticateUser.isPending}
          />
          {errors.password && (
            <small className="text-sm text-red-500">{errors.password.message}</small>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2 text-lg md:text-xl font-medium text-white bg-primary rounded-xl disabled:bg-[#dbfde2] disabled:text-[#47e167] capitalize"
          disabled={authenticateUser.isPending}
        >
          masuk
        </button>
        <p className="text-[#8E8E8E] text-base md:text-xl text-center lowercase first-letter:capitalize">
          belum punya akun?{" "}
          <Link to="/user/register" className="font-medium capitalize text-primary">
            registrasi
          </Link>
        </p>
        <Link
          to="/admin/login"
          className="text-base font-medium text-center lowercase md:text-xl text-primary first-letter:capitalize"
        >
          masuk sebagai admin
        </Link>
      </form>
    </section>
  );
};

export default LoginPage;