import useRiwayatQueries from "@/hooks/website/riwayat/useRiwayatQueries";
import { Link, useParams } from "react-router-dom";

const AntrianPage = () => {
  const { id } = useParams();
  const { RiwayatByIdQuery } = useRiwayatQueries({ id });
  const data = RiwayatByIdQuery.data;

  if (RiwayatByIdQuery.isLoading) return <div>Loading...</div>;
  if (!data) return <div>Data tidak ditemukan</div>;

  return (
    <section>
      <header className="content-center h-56 text-center bg-primary sm:py-10 sm:px-8 md:px-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Nomor Antrean</h1>
      </header>
      <article className="px-4 py-10 space-y-5 sm:px-6 md:px-32 justify-items-center">
        <h1 className="text-xl font-bold sm:text-2xl">{data.Spesialisasi.nama}</h1>
        <p className="font-medium text-gray-500">
          Tanggal {new Date(data.appointmentDate).toLocaleDateString()} Pukul {data.appointmentTime}
        </p>
        <h1 className="text-6xl font-medium text-center sm:text-9xl text-primary">{data.nomorAntrian}</h1>
        <p className="font-medium text-center text-gray-500">
          Harap datang 15 menit lebih awal sebelum waktu konsultasi, jika pasien terlambat maka reservasi akan dibatalkan.
        </p>
        <div className="text-center">
          <Link to="/user/riwayat" className="px-6 py-2 mt-10 text-white rounded bg-primary hover:bg-primary-dark">
            Kembali
          </Link>
        </div>
      </article>
    </section>
  );
};

export default AntrianPage;
