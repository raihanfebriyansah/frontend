import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from '@/components/ui/CustomAlert';
import { useState } from "react";
import useDoctorQueries from "@/hooks/admin/doctor/useDoctorQueries";
import useJadwalDokterUmumMutations from "@/hooks/admin/jadwal-dokter/umum/useJadwalDokterUmumMutations";

const JadwalDokterUmumForm = ({ data, formMode }) => {
  const navigate = useNavigate();
  const { create, edit } = useJadwalDokterUmumMutations()
  const { doctorTakeAllQueries } = useDoctorQueries()
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jadwal_mulai: data?.jadwal_mulai || "",
      jadwal_selesai: data?.jadwal_selesai || "",
      senin: data?.senin || "",
      selasa: data?.selasa || "",
      rabu: data?.rabu || "",
      kamis: data?.kamis || "",
      jumat: data?.jumat || "",
      sabtu: data?.sabtu || "",
      minggu: data?.minggu || "",
    },
    values: data
      ? {
        jadwal_mulai: data.jadwal_mulai,
        jadwal_selesai: data.jadwal_selesai,
        senin: data.senin,
        selasa: data.selasa,
        rabu: data.rabu,
        kamis: data.kamis,
        jumat: data.jumat,
        sabtu: data.sabtu,
        minggu: data.minggu,
      }
      : undefined,
  });

  const onSubmit = (formData) => {
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
            navigate("/admin/jadwal-dokter/umum");
          }
        });
      } else {
        create.mutate(pendingFormData, {
          onSuccess: () => {
            setShowUpdateAlert(false);
            setPendingFormData(null);
            navigate("/admin/jadwal-dokter/umum");
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
        <h1 className="text-3xl font-medium text-primary">{`${formMode === "edit" ? "Ubah" : "tambahkan"} jadwal dokter umum`}</h1>
      </header>
      <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-1/2 p-10 space-y-6 bg-white shadow-md">
        <div className="flex flex-col gap-4">
          <label htmlFor="jadwal_mulai" className="text-xl font-medium text-primary">waktu (WIT)</label>
          <small className="text-primary">mulai</small>
          <input type="time" id="jadwal_mulai" {...register("jadwal_mulai")} placeholder="masukkan jam layanan" className="py-3 px-4 border border-[#5C5B5B] rounded-lg" />
          {errors.jadwal_mulai && <small className="text-sm text-red-500">{errors.jadwal_mulai.message}</small>}
          <small className="text-primary">selesai</small>
          <input type="time" id="jadwal_selesai" {...register("jadwal_selesai")} placeholder="masukkan jam layanan" className="py-3 px-4 border border-[#5C5B5B] rounded-lg" />
          {errors.jadwal_selesai && <small className="text-sm text-red-500">{errors.jadwal_selesai.message}</small>}
        </div>
        {['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((day) => (
          <div key={day} className="flex flex-col gap-4">
            <label className="text-xl font-medium text-primary">
              {day}
            </label>
            <select id="day" {...register(day)} className="py-3 px-4 border border-[#5C5B5B] rounded-lg">
              <option value="" selected>{doctorTakeAllQueries.isPending ? "Loading..." : "pilih dokter"}</option>
              {doctorTakeAllQueries.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
              {errors[day] && <small className="text-sm text-red-500">{errors[day].message}</small>}
            </select>
          </div>
        ))}
        <div className="flex items-center justify-end gap-5">
          <Link to="/admin/jadwal-dokter/umum" className="px-6 py-2 font-medium border rounded-lg border-primary text-primary">batal</Link>
          <button type="submit" className="px-6 py-2 font-medium text-white capitalize rounded-lg bg-primary">{formMode === "edit" ? edit.isPending ? "loading..." : "ubah" : create.isPending ? "loading..." : "simpan"}</button>
        </div>
      </form>
      {showUpdateAlert && (
        <CustomAlert
          title={`${formMode === "edit" ? "ubah" : "tambahkan"} jadwal dokter umum`}
          message={`apakah anda yakin ingin ${formMode === "edit" ? "mengubah" : "menambahkan"} jadwal dokter umum ini?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
};

export default JadwalDokterUmumForm;