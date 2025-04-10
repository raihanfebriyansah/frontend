import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CustomAlert from '@/components/ui/CustomAlert';
import { useState, useMemo, useEffect } from "react";
import useSpesialisasiQueries from "@/hooks/admin/spesialisasi/useSpesialisasiQueries";
import useReservasiMutations from "@/hooks/website/reservasi/useReservasiMutations";

const ReservasiForm = ({ data, formMode }) => {
  const navigate = useNavigate();
  const { create, edit } = useReservasiMutations();
  const { spesialisasiTakeAllQueries } = useSpesialisasiQueries();

  // Controlled state for appointment fields
  const [selectedDate, setSelectedDate] = useState(data?.appointmentDate || "");
  const [selectedTime, setSelectedTime] = useState(data?.appointmentTime || "");

  // Populate state on edit from database
  useEffect(() => {
    if (data) {
      // Format appointmentDate to "YYYY-MM-DD" for the date input
      const formattedDate = data.appointmentDate ? new Date(data.appointmentDate).toISOString().split("T")[0] : "";
      setSelectedDate(formattedDate);
      setSelectedTime(data.appointmentTime || "");
    }
  }, [data]);

  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: data?.nama || "",
      umur: data?.umur || "",
      no_hp: data?.no_hp || "",
      alamat: data?.alamat || "",
      jenis_kelamin: data?.jenis_kelamin || "",
      appointmentTime: data?.appointmentTime || "",
      appointmentDate: data?.appointmentDate || "",
      spesialisasiId: data?.spesialisasiId || "",
      status: data?.status || "",
    },
    values: {
      nama: data?.nama || "",
      umur: data?.umur || "",
      no_hp: data?.no_hp || "",
      alamat: data?.alamat || "",
      jenis_kelamin: data?.jenis_kelamin || "",
      appointmentTime: data?.appointmentTime || "",
      appointmentDate: data?.appointmentDate || "",
      spesialisasiId: data?.spesialisasiId || "",
      status: data?.status || "",
    },
  });

  // New computeTimeSlots function similar to website
  const computeTimeSlots = (startTime, endTime, estimasi) => {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };
    const formatTime = (date) =>
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    let slots = [];
    let current = new Date(start);
    while (current <= end) {
      slots.push(formatTime(current));
      current = new Date(current.getTime() + estimasi * 60000);
    }
    return slots;
  };

  const spesialisasiOptions = spesialisasiTakeAllQueries.data || [];
  const selectedSpesialisasiId = watch("spesialisasiId");
  const selectedSpesialisasi = spesialisasiOptions.find(item => String(item.id) === String(selectedSpesialisasiId));

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const dayMap = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
    return dayMap[date.getDay()];
  };
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !selectedSpesialisasi) return [];
    const dayName = getDayName(selectedDate);
    if (!selectedSpesialisasi.hari.includes(dayName)) return [];
    return computeTimeSlots(
      selectedSpesialisasi.jam_mulai,
      selectedSpesialisasi.jam_selesai,
      selectedSpesialisasi.estimasi
    );
  }, [selectedDate, selectedSpesialisasi]);

  const onSubmit = (formData) => {
    formData.appointmentDate = selectedDate;
    formData.appointmentTime = selectedTime;
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
            navigate("/admin/reservasi");
          }
        });
      } else {
        create.mutate(pendingFormData, {
          onSuccess: () => {
            setShowUpdateAlert(false);
            setPendingFormData(null);
            navigate("/admin/reservasi");
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
        <h1 className="text-3xl font-medium text-primary">{`${formMode === "edit" ? "ubah reservasi" : "tambahkan reservasi onsite"}`}</h1>
      </header>
      <form method="post" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-1/2 p-10 space-y-6 bg-white shadow-md">
        <div className="flex flex-col gap-4">
          <label htmlFor="nama" className="text-xl font-medium text-primary">nama pasien</label>
          <input type="text" id="nama" {...register("nama")} placeholder="masukkan nama pasien" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize" />
          {errors.nama && <small className="text-sm text-red-500">{errors.nama.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="umur" className="text-xl font-medium text-primary">umur</label>
          <input type="text" id="umur" {...register("umur")} placeholder="masukkan umur" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize" />
          {errors.umur && <small className="text-sm text-red-500">{errors.umur.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="no_hp" className="text-xl font-medium text-primary">nomor telepon</label>
          <input type="text" id="no_hp" {...register("no_hp")} placeholder="masukkan no telepon" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize" />
          {errors.no_hp && <small className="text-sm text-red-500">{errors.no_hp.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="alamat" className="text-xl font-medium text-primary">alamat</label>
          <input type="text" id="alamat" {...register("alamat")} placeholder="masukkan alamat" className="py-3 px-4 border border-[#5C5B5B] rounded-lg placeholder:capitalize" />
          {errors.alamat && <small className="text-sm text-red-500">{errors.alamat.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="jenis_kelamin" className="text-xl font-medium text-primary">jenis kelamin</label>
          <select id="jenis_kelamin" {...register("jenis_kelamin")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg">
            <option value="" selected>jenis kelamin</option>
            <option value="laki-laki">Laki-Laki</option>
            <option value="perempuan">perempuan</option>
          </select>
          {errors.jenis_kelamin && <small className="text-sm text-red-500">{errors.jenis_kelamin.message}</small>}
        </div>
        {/* New input field for appointmentDate */}
        <div className="flex flex-col gap-4">
          <label htmlFor="appointmentDate" className="text-xl font-medium text-primary">tanggal reservasi</label>
          <input
            type="date"
            id="appointmentDate"
            value={selectedDate}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedDate(val);
              setValue("appointmentDate", val);
            }}
            className="py-3 px-4 border border-[#5C5B5B] rounded-lg"
          />
          {errors.appointmentDate && <small className="text-sm text-red-500">{errors.appointmentDate.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="appointmentTime" className="text-xl font-medium text-primary">waktu</label>
          {selectedDate ? (
            availableTimeSlots.length > 0 ? (
              <select
                id="appointmentTime"
                value={selectedTime}
                onChange={(e) => {
                  setSelectedTime(e.target.value);
                  setValue("appointmentTime", e.target.value);
                }}
                className="py-3 px-4 border border-[#5C5B5B] rounded-lg"
              >
                <option value="" disabled selected>pilih waktu</option>
                {availableTimeSlots.map((time, idx) => (
                  <option key={idx} value={time}>{time}</option>
                ))}
              </select>
            ) : (
              <p>Tidak ada waktu tersedia</p>
            )
          ) : (
            <p>Pilih tanggal terlebih dahulu</p>
          )}
          {errors.appointmentTime && <small className="text-sm text-red-500">{errors.appointmentTime.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="spesialisasiId" className="text-xl font-medium text-primary">spesialisasi</label>
          <select
            id="spesialisasiId"
            {...register("spesialisasiId")}
            className="py-3 px-4 border border-[#5C5B5B] rounded-lg"
          >
            <option value="" disabled selected>pilih spesialisasi</option>
            {spesialisasiOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
          {errors.spesialisasiId && <small className="text-sm text-red-500">{errors.spesialisasiId.message}</small>}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="status" className="text-xl font-medium text-primary">status</label>
          <select id="status" {...register("status")} className="py-3 px-4 border border-[#5C5B5B] rounded-lg">
            <option disabled>pilih status</option>
            <option value="proses">proses</option>
            <option value="selesai">selesai</option>
            <option value="batal">batal</option>
          </select>
          {errors.active && <small className="text-sm text-red-500">{errors.active.message}</small>}
        </div>
        <div className="flex items-center justify-end gap-5">
          <Link to="/admin/doctor" className="px-6 py-2 font-medium border rounded-lg border-primary text-primary">batal</Link>
          <button type="submit" className="px-6 py-2 font-medium text-white rounded-lg bg-primary">
            {formMode === "edit" ? (edit?.isPending ? "loading..." : "ubah") : (create?.isPending ? "loading..." : "simpan")}
          </button>
        </div>
      </form>
      {showUpdateAlert && (
        <CustomAlert
          title={`${formMode === "edit" ? "ubah" : "tambahkan"} reservasi`}
          message={`apakah anda yakin ingin ${formMode === "edit" ? "mengubah" : "menambahkan"} reservasi ini?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
};

export default ReservasiForm;