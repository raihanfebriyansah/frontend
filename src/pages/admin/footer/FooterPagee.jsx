import CustomAlert from "@/components/ui/CustomAlert";
import useFooterMutations from "@/hooks/admin/footer/useFooterMutations";
import useFooterQueries from "@/hooks/admin/footer/useFooterQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FooterPage = () => {
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const { update } = useFooterMutations();
  const { getById } = useFooterQueries();
  const data = getById.data || {};

  const FooterSchema = z.object({
    telepon: z.string().min(3, "telepon kurang dari 3 karakter").max(16, "telepon lebih dari 16 karakter"),
    whatsapp: z.string().min(3, "whatsapp kurang dari 3 karakter").max(16, "whatsapp lebih dari 16 karakter"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FooterSchema),
    defaultValues: {
      telepon: data.telepon || "",
      whatsapp: data.whatsapp || "",
      alamat: data.alamat || ""
    },
    values: data ? {
      telepon: data.telepon,
      whatsapp: data.whatsapp,
      alamat: data.alamat
    } : undefined
  });

  const onSubmit = (data) => {
    setPendingFormData(data);
    setShowUpdateAlert(true);
  };

  const handleConfirm = () => {
    update.mutate(pendingFormData, {
      onSuccess: () => {
        setShowUpdateAlert(false);
        setPendingFormData(null);
      }
    })
  };

  const handleCancel = () => {
    setShowUpdateAlert(false);
    setPendingFormData(null);
  };

  return (
    <section className="px-12 capitalize">
      <header className="py-9">
        <h1 className="text-3xl font-medium text-primary">setting footer</h1>
      </header>
      <form method="post" className="w-1/2 p-10 space-y-6 bg-white shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <label htmlFor="telepon" className="text-xl font-medium text-primary">telepon</label>
          <input
            type="text"
            id="telepon"
            {...register("telepon")}
            placeholder="masukkan telepon"
            className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize"
            inputMode="numeric"
            onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); }}
          />
          {errors.telepon && <small className="text-sm text-red-500">{errors.telepon.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="whatsapp" className="text-xl font-medium text-primary">whatsapp</label>
          <input
            type="text"
            id="whatsapp"
            {...register("whatsapp")}
            placeholder="masukkan whatsapp"
            className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize"
            inputMode="numeric"
            onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); }}
          />
          {errors.whatsapp && <small className="text-sm text-red-500">{errors.whatsapp.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="alamat" className="text-xl font-medium text-primary">alamat</label>
          <input type="text" id="alamat" {...register("alamat")} placeholder="masukkan alamat" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize" />
          {errors.alamat && <small className="text-sm text-red-500">{errors.alamat.message}</small>}
        </div>
        <div className="flex items-center justify-end gap-5">
          <button type="submit" className="px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">simpan</button>
        </div>
      </form>
      {showUpdateAlert && (
        <CustomAlert
          title="konfirmasi"
          message="apakah anda yakin ingin mengubah footer ini?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  )
}

export default FooterPage