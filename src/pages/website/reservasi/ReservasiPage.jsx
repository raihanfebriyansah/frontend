import { useState, useMemo } from "react";
import useSpesialisasiQueries from "@/hooks/website/spesialisasi/useSpesialisasiQueries";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useReservasiMutations from "@/hooks/website/reservasi/useReservasiMutations";
import CustomAlert from "@/components/ui/CustomAlert";

const weekdays = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
const formatDays = (hariArray) => {
  const sorted = hariArray.slice().sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
  const groups = [];
  let currentGroup = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prevIndex = weekdays.indexOf(sorted[i - 1]);
    const currentIndex = weekdays.indexOf(sorted[i]);
    if (currentIndex === prevIndex + 1) {
      currentGroup.push(sorted[i]);
    } else {
      groups.push(currentGroup);
      currentGroup = [sorted[i]];
    }
  }
  groups.push(currentGroup);
  return groups
    .map(group => group.length > 1 ? `${group[0]} - ${group[group.length - 1]}` : group[0])
    .join(", ");
};

const ReservasiPage = () => {
  const { id } = useParams();
  const { spesialisasiByIdQuery } = useSpesialisasiQueries({ id: id });
  const { reservasi } = useReservasiMutations();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const dataSpesialisasi = spesialisasiByIdQuery.data;
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const dayMap = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
    return dayMap[date.getDay()];
  };

  const computeTimeSlots = (jamMulai, jamSelesai, estimasi) => {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const start = parseTime(jamMulai);
    const end = parseTime(jamSelesai);
    let slots = [];
    let current = new Date(start);

    while (current <= end) {
      slots.push(formatTime(current));
      current = new Date(current.getTime() + estimasi * 60000);
    }
    return slots;
  };

  const spesialisasi = spesialisasiByIdQuery.data;

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !spesialisasi) return [];
    const selectedDay = getDayName(selectedDate);
    if (!spesialisasi.hari.includes(selectedDay)) return [];
    return computeTimeSlots(spesialisasi.jam_mulai, spesialisasi.jam_selesai, spesialisasi.estimasi);
  }, [selectedDate, spesialisasi]);

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      nama: "",
      umur: "",
      no_hp: "",
    },
  });

  const onSubmit = async (data) => {
    data.id = id;
    setPendingFormData(data);
    setShowUpdateAlert(true);
  };

  const handleConfirm = () => {
    try {
      const payload = {
        ...pendingFormData,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime
      };
      reservasi.mutate(payload, {
        onSuccess: () => {
          setShowUpdateAlert(false);
          setPendingFormData(null);
        }
      });
      setShowUpdateAlert(false);
      setPendingFormData(null);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleCancel = () => {
    setShowUpdateAlert(false);
    setPendingFormData(null);
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <header className="content-center h-56 text-center bg-primary sm:py-10 sm:px-8 md:px-16">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Buat Reservasi</h1>
        </header>
        <div className="grid grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3 md:px-32">
          <article className="col-span-2 space-y-6">
            <h1 className="text-2xl font-bold">Tanggal dan Waktu Konsultasi</h1>
            <input
              type="date"
              className="w-full h-12 px-5 border rounded-lg border-primary focus:outline-none focus:border-primary text-primary"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            {selectedDate && (
              availableTimeSlots.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {availableTimeSlots.map((time, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded ${selectedTime === time ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <p>Tidak ada waktu tersedia untuk hari ini.</p>
              )
            )}
          </article>
          <article className="space-y-5">
            <h1 className="text-2xl font-bold text-center text-primary">Data Pasien</h1>
            <div className="flex flex-col space-y-4">
              <label htmlFor="nama" className="text-xl font-medium text-primary">Nama Lengkap</label>
              <input type="text" id="nama" {...register("nama")} className="px-4 py-3 border border-gray-400 rounded-lg" placeholder="Masukkan Nama Lengkap" />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="umur" className="text-xl font-medium text-primary">Umur</label>
              <input type="text" id="umur" {...register("umur")} className="px-4 py-3 border border-gray-400 rounded-lg" placeholder="Masukkan Umur" />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="no_hp" className="text-xl font-medium text-primary">Nomor Telepon</label>
              <input type="text" id="no_hp" {...register("no_hp")} className="px-4 py-3 border border-gray-400 rounded-lg" placeholder="Masukkan Nomor Telepon" />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="alamat" className="text-xl font-medium text-primary">Alamat</label>
              <input type="text" id="alamat" {...register("alamat")} className="px-4 py-3 border border-gray-400 rounded-lg" placeholder="Masukkan Alamat" />
            </div>
            <div className="flex flex-col space-y-4">
              <label htmlFor="jenis_kelamin" className="text-xl font-medium text-primary">Jenis Kelamin</label>
              <select id="jenis_kelamin" {...register("jenis_kelamin")} className="px-4 py-3 border border-gray-400 rounded-lg">
                <option disabled selected>Pilih Jenis Kelamin</option>
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div className="p-6 space-y-4 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">{dataSpesialisasi?.nama || "Loading..."}</h1>
              <div className="flex items-center justify-between">
                <p>{dataSpesialisasi ? formatDays(dataSpesialisasi.hari) : ""}</p>
                <p>{dataSpesialisasi ? `${dataSpesialisasi.jam_mulai} - ${dataSpesialisasi.jam_selesai}` : ""}</p>
              </div>
              <button type="submit" className="w-full py-2 font-medium text-white rounded-lg bg-primary">Buat Reservasi</button>
            </div>
          </article>
        </div>
      </form>
      {showUpdateAlert && (
        <CustomAlert
          title="Konfirmasi Reservasi"
          message={`Apakah Anda yakin ingin melakukan reservasi?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default ReservasiPage;
