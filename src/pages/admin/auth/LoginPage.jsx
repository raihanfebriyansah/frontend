import { useAuthMutations } from "@/hooks/auth/useAuthMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import z from "zod";
import KlinikPutriLogo from '@/assets/logo/klinik-putri.png'

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username kurang dari 3 karakter")
    .max(16, "Username lebih dari 16 karakter")
    .regex(/^[a-z0-9]+$/, "Username hanya boleh berisi huruf kecil dan angka"),
  password: z.string().min(6, "Password kurang dari 6 karakter"),
});

const LoginPage = () => {
  const { authenticateAdmin } = useAuthMutations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (data) => {
    try {
      authenticateAdmin.mutate(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <main className="grid min-h-screen grid-cols-1 bg-gray-100 md:grid-cols-3">
      <Toaster />
      <section className="flex justify-center items-center bg-[#159030]/20 col-span-1 md:col-span-2 p-6">
        <img src={KlinikPutriLogo} alt={`Logo Klinik Putri`} className="h-auto max-w-full" />
      </section>
      <section className="flex items-center justify-center p-6 sm:p-10 md:p-14">
        <div className="w-full max-w-md">
          <header className="mb-10 text-center">
            <h1 className="text-[#159030] text-3xl sm:text-4xl font-medium">Masuk</h1>
          </header>
          <form className="flex flex-col space-y-5" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <label htmlFor="username" className="text-xl font-medium text-primary">Username</label>
              <input
                type="text"
                id="username"
                {...register("username")}
                placeholder="Masukkan Username"
                className="py-3 px-4 border border-[#5C5B5B] rounded-lg w-full"
                disabled={authenticateAdmin.isPending}
              />
              {errors.username && <small className="text-sm text-red-500">{errors.username.message}</small>}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="password" className="text-xl font-medium text-primary">Kata Sandi</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Masukkan Kata Sandi"
                className="py-3 px-4 border border-[#5C5B5B] rounded-lg w-full"
                disabled={authenticateAdmin.isPending}
              />
              {errors.password && <small className="text-sm text-red-500">{errors.password.message}</small>}
            </div>
            <button
              type="submit"
              className="bg-[#159030] w-full px-6 py-2.5 rounded-lg text-white disabled:bg-[#dbfde2] disabled:text-[#47e167]"
              disabled={authenticateAdmin.isPending}
            >
              {authenticateAdmin.isPending ? 'Tunggu...' : 'Masuk'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
