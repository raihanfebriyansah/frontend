import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomAlert from '@/components/ui/CustomAlert';
import { useState } from "react";
import useDoctorMutations from "@/hooks/admin/doctor/useDoctorMutations";
import useSpesialisasiQueries from "@/hooks/admin/spesialisasi/useSpesialisasiQueries";

// Schema
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const doctorFormSchema = z.object({
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
  name: z.string().nonempty("Nama doctor wajib diisi"),
  active: z.string().default("true"),
  spesialisasiId: z.string().nonempty("Spesialisasi wajib diisi"),
});

const DoctorForm = ({ data, formMode }) => {
  const navigate = useNavigate();
  const { create, edit } = useDoctorMutations();
  const { spesialisasiTakeAllQueries } = useSpesialisasiQueries();
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      image: null,
      name: data?.nama || "",
      active: data?.isActive ? "true" : "false",
      spesialisasiId: data?.spesialisasiId || "",
    },
    values: {
      image: null,
      name: data?.nama || "",
      active: data?.isActive ? "true" : "false",
      spesialisasiId: data?.spesialisasiId || "",
    },
  });

  const onSubmit = (formData) => {
    console.log("Form data:", formData);
    setPendingFormData(formData);
    setShowUpdateAlert(true);
  };

  const handleConfirm = () => {
    try {
      if (formMode === "edit") {
        edit.mutate({ id: data.id, formData: pendingFormData }, {
          onSuccess: () => {
            setShowUpdateAlert(false);
            setPendingFormData(null);
            navigate("/admin/doctor");
          }
        });
      } else {
        create.mutate(pendingFormData, {
          onSuccess: () => {
            setShowUpdateAlert(false);
            setPendingFormData(null);
            navigate("/admin/doctor");
          }
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    setShowUpdateAlert(false);
    setPendingFormData(null);
  };

  return (
    <section className="px-12 capitalize">
      <header className="py-9">
        <h1 className="text-3xl font-medium text-primary">{`${formMode === "edit" ? "Ubah" : "Tambahkan"} dokter`}</h1>
      </header>
      <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-1/2 p-10 space-y-6 bg-white shadow-md">
        <div className="flex flex-col gap-4">
          <label htmlFor="image" className="text-xl font-medium text-primary">gambar</label>
          <input type="file" id="image" {...register("image")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg" />
          {errors.image && <small className="text-sm text-red-500">{errors.image.message}</small>}
          {formMode === "edit" && data?.foto && (
            <div className="mt-2">
              <p>gambar saat ini:</p>
              <img src={data.foto} alt="Current" className="h-24 mt-1 rounded" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="spesialisasiId" className="text-xl font-medium text-primary">spesialisasi</label>
          <select id="spesialisasiId" {...register("spesialisasiId")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg">
            <option disabled>{spesialisasiTakeAllQueries.isLoading ? "Loading..." : "pilih spesialisasi"}</option>
            {spesialisasiTakeAllQueries.data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
          {errors.spesialisasiId && <small className="text-sm text-red-500">{errors.spesialisasiId.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-xl font-medium text-primary">nama dokter</label>
          <input type="text" id="name" {...register("name")} placeholder="masukkan nama dokter" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize" />
          {errors.name && <small className="text-sm text-red-500">{errors.name.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="active" className="text-xl font-medium text-primary">status</label>
          <select id="active" {...register("active")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg capitalize">
            <option disabled>pilih status</option>
            <option value="true">aktif</option>
            <option value="false">tidak aktif</option>
          </select>
          {errors.active && <small className="text-sm text-red-500">{errors.active.message}</small>}
        </div>
        <div className="flex items-center justify-end gap-5">
          <Link to="/admin/doctor" className="px-6 py-2 font-medium border rounded-lg border-primary text-primary">batal</Link>
          <button type="submit" className="px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">{formMode === "edit" ? edit.isPending ? "loading..." : "ubah" : create.isPending ? "loading..." : "simpan"}</button>
        </div>
      </form>
      {showUpdateAlert && (
        <CustomAlert
          title={`${formMode === "edit" ? "ubah" : "tambahkan"} doctor`}
          message={`apakah anda yakin ingin ${formMode === "edit" ? "mengubah" : "menambahkan"} doctor ini?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
};

export default DoctorForm;