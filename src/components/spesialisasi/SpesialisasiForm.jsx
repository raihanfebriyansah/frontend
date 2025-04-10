import useSpesialisasiMutations from "@/hooks/admin/spesialisasi/useSpesialisasiMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import CustomAlert from '@/components/ui/CustomAlert';
import { useState } from "react";

// Schema
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const spesialisasiFormSchema = z.object({
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
  name: z.string().nonempty("Nama spesialisasi wajib diisi"),
  start_time: z.string().nonempty("Jam mulai wajib diisi"),
  end_time: z.string().nonempty("Jam selesai wajib diisi"),
  days: z.array(z.string()).nonempty("Pilih minimal satu hari."),
  estimated_time: z.coerce.number().min(1, "Minimal 1 menit").max(240, "Maksimal 240 menit"),
  active: z.string().default("true")
});

const SpesialisasiForm = ({ data, formMode }) => {
  const navigate = useNavigate();
  const { create, edit } = useSpesialisasiMutations();
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(spesialisasiFormSchema),
    defaultValues: data ? {
      image: null,
      name: data.nama,
      start_time: data.jam_mulai,
      end_time: data.jam_selesai,
      days: data.hari || [],
      estimated_time: data.estimasi,
      active: data.aktif,
    } : undefined,
  });

  const onSubmit = (formData) => {
    setPendingFormData(formData);
    setShowUpdateAlert(true);
  };

  const handleConfirm = () => {
    try {
      if(formMode === "edit") {
        edit.mutate({ id: data.id, formData: pendingFormData }, {
          onSuccess: () => {
            setShowUpdateAlert(false);
            setPendingFormData(null);
            navigate("/admin/spesialisasi");
          }
        });
      } else {
        create.mutate(pendingFormData, {
          onSuccess: () => {
            setShowUpdateAlert(false);
            setPendingFormData(null);
            navigate("/admin/spesialisasi");
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
        <h1 className="text-3xl font-medium text-primary">{`${formMode === "edit" ? "Ubah" : "Tambahkan"} spesialisasi`}</h1>
      </header>
      <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-1/2 p-10 space-y-6 bg-white shadow-md">
        <div className="flex flex-col gap-4">
          <label htmlFor="image" className="text-xl font-medium text-primary">gambar</label>
          <input type="file" id="image" {...register("image")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg" />
          {errors.image && <small className="text-sm text-red-500">{errors.image.message}</small>}
          {formMode === "edit" && data?.foto && (
            <div className="mt-2">
              <p>Current image:</p>
              <img src={data.foto} alt="Current" className="h-24 mt-1 rounded" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-xl font-medium text-primary">layanan spesialisasi</label>
          <input type="text" id="name" {...register("name")} placeholder="masukkan spesialisasi" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize" />
          {errors.name && <small className="text-sm text-red-500">{errors.name.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="start_time" className="text-xl font-medium text-primary">jam layanan</label>
          <small>mulai</small>
          <input type="time" id="start_time" {...register("start_time")} placeholder="masukkan jam layanan" className="py-3 px-4 border border-[#5C5B5B] rounded-lg" />
          {errors.start_time && <small className="text-sm text-red-500">{errors.start_time.message}</small>}
          <small>selesai</small>
          <input type="time" id="end_time" {...register("end_time")} placeholder="masukkan jam layanan" className="py-3 px-4 border border-[#5C5B5B] rounded-lg" />
          {errors.end_time && <small className="text-sm text-red-500">{errors.end_time.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="days" className="text-xl font-medium text-primary">hari layanan</label>
          <div className="flex items-center gap-4">
            <label><input type="checkbox" value="senin" {...register("days")} /> senin</label>
            <label><input type="checkbox" value="selasa" {...register("days")} /> selasa</label>
            <label><input type="checkbox" value="rabu" {...register("days")} /> rabu</label>
            <label><input type="checkbox" value="kamis" {...register("days")} /> kamis</label>
            <label><input type="checkbox" value="jumat" {...register("days")} /> jumat</label>
            <label><input type="checkbox" value="sabtu" {...register("days")} /> sabtu</label>
            <label><input type="checkbox" value="minggu" {...register("days")} /> minggu</label>
          </div>
          {errors.days && <small className="text-sm text-red-500">{errors.days.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="estimated_time" className="text-xl font-medium text-primary">estimasi waktu (menit)</label>
          <input
            type="number"
            id="estimated_time"
            {...register("estimated_time", { valueAsNumber: true })}
            placeholder="contoh: 30"
            className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize"
          />
          {errors.estimated_time && <small className="text-sm text-red-500">{errors.estimated_time.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="active" className="text-xl font-medium text-primary">status layanan</label>
          <select id="active" {...register("active")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg capitalize">
            <option selected disabled>pilih status</option>
            <option value="true">aktif</option>
            <option value="false">tidak aktif</option>
          </select>
          {errors.active && <small className="text-sm text-red-500">{errors.active.message}</small>}
        </div>
        <div className="flex items-center justify-end gap-5">
          <Link to="/admin/spesialisasi" className="px-6 py-2 font-medium border rounded-lg border-primary text-primary">batal</Link>
          <button type="submit" className="px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">{formMode === "edit" ? edit.isPending ? "loading..." : "ubah" : create.isPending ? "loading..." : "simpan"}</button>
        </div>
      </form>
      {showUpdateAlert && (
        <CustomAlert
          title={`${formMode === "edit" ? "ubah" : "tambahkan"} spesialisasi`}
          message={`apakah anda yakin ingin ${formMode === "edit" ? "mengubah" : "menambahkan"} spesialisasi ini?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
};

export default SpesialisasiForm;