import useJadwalDokterSpesialisasiQueries from "@/hooks/website/jadwal-dokter-spesialisasi/JadwalDokterSpesialisasiQueries";
import useJadwalDokterUmumQueries from "@/hooks/website/jadwal-dokter-umum/JadwalDokterUmumQueries";

const JadwalDokterPage = () => {
  const { jadwalDokterUmumTakeAllQueries } = useJadwalDokterUmumQueries();
  const { jadwalDokterSpesialisasiTakeAllQueries } = useJadwalDokterSpesialisasiQueries();

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

  return (
    <section className="px-4 py-10 md:px-32">
      <article className="pb-10 capitalize">
        <h1 className="text-2xl font-bold text-center md:text-4xl text-primary mb-9">
          dokter umum
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="border h-14 border-b-gray-500">
              <tr>
                <th className="px-2 py-3">waktu (WIT)</th>
                <th className="px-2 py-3">senin</th>
                <th className="px-2 py-3">selasa</th>
                <th className="px-2 py-3">rabu</th>
                <th className="px-2 py-3">kamis</th>
                <th className="px-2 py-3">jumat</th>
                <th className="px-2 py-3">sabtu</th>
                <th className="px-2 py-3">minggu</th>
              </tr>
            </thead>
            <tbody>
              {jadwalDokterUmumTakeAllQueries?.data?.map((dokterUmum) => (
                <tr key={dokterUmum.id} className="text-center h-14">
                  <td className="px-2 py-2">
                    {dokterUmum.jadwal_mulai} - {dokterUmum.jadwal_selesai}
                  </td>
                  <td className="px-2 py-2">{dokterUmum.doctorSenin?.nama || "-"}</td>
                  <td className="px-2 py-2">{dokterUmum.doctorSelasa?.nama || "-"}</td>
                  <td className="px-2 py-2">{dokterUmum.doctorRabu?.nama || "-"}</td>
                  <td className="px-2 py-2">{dokterUmum.doctorKamis?.nama || "-"}</td>
                  <td className="px-2 py-2">{dokterUmum.doctorJumat?.nama || "-"}</td>
                  <td className="px-2 py-2">{dokterUmum.doctorSabtu?.nama || "-"}</td>
                  <td className="px-2 py-2">{dokterUmum.doctorMinggu?.nama || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      <article className="py-10 capitalize">
        <h1 className="text-2xl font-bold text-center md:text-4xl text-primary mb-9">
          dokter spesialis
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="border border-b-gray-500 h-14">
              <tr>
                <th className="px-2 py-3">spesialis</th>
                <th className="px-2 py-3">nama dokter</th>
                <th className="px-2 py-3">hari</th>
                <th className="px-2 py-3">waktu</th>
              </tr>
            </thead>
            <tbody>
              {jadwalDokterSpesialisasiTakeAllQueries?.data?.map((dokterSpesialis) => (
                <tr key={dokterSpesialis.id} className="text-center h-14">
                  <td className="px-2 py-2">{dokterSpesialis.Spesialisasi?.nama || "-"}</td>
                  <td className="px-2 py-2">{dokterSpesialis.Doctor?.nama || "-"}</td>
                  <td className="px-2 py-2">
                    {formatDays(dokterSpesialis.Spesialisasi?.hari)}
                  </td>
                  <td className="px-2 py-2">
                    {dokterSpesialis.Spesialisasi.jam_mulai} -{" "}
                    {dokterSpesialis.Spesialisasi.jam_selesai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default JadwalDokterPage;