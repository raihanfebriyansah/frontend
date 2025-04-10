import useSpesialisasiQueries from "@/hooks/website/spesialisasi/useSpesialisasiQueries";
import Illustration from "@/assets/images/images.png";
import { Link } from "react-router-dom";

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

const BerandaPage = () => {
  const { spesialisasiTakeAllQueries } = useSpesialisasiQueries();

  if (spesialisasiTakeAllQueries.isPending)
    return <section className="px-4 py-10 md:px-32">loading...</section>

  return (
    <section className="px-4 py-10 md:px-32">
      <section className="grid grid-cols-1 gap-4 px-6 capitalize rounded-lg lg:grid-cols-3 bg-primary md:px-14 py-7">
        <div className="flex flex-col justify-center w-full col-span-2 text-white space-y-7">
          <h1 className="text-4xl font-bold md:text-5xl">reservasi dokter dari rumah, lebih mudah dan cepat</h1>
          <p className="text-lg lowercase md:text-xl first-letter:capitalize">akses layanan reservasi dokter kapan saja, dari mana saja, tanpa harus ke klinik.</p>
          <Link to="/jadwal-dokter" className="px-6 py-2 font-bold bg-white rounded-lg text-primary w-fit">lihat spesialisasi</Link>
        </div>
        <div className="flex justify-center">
          <img src={Illustration} alt="images" className="object-contain max-w-md" />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {spesialisasiTakeAllQueries?.data?.map((spesialisasi) => (
          <article key={spesialisasi.id} className="capitalize bg-white rounded-lg shadow-xl">
            <figure className="h-[250px] anchor-center">
              <img src={spesialisasi.foto ? spesialisasi.foto : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="} alt={spesialisasi.nama} className="object-cover object-center w-full h-full rounded-t-lg" />
            </figure>
            <div className="flex flex-col gap-5 p-5">
              <h2 className="text-2xl font-bold text-primary">{spesialisasi.nama}</h2>
              <div className="flex items-center justify-between">
                <p>{formatDays(spesialisasi.hari)}</p>
                <p>{spesialisasi.jam_mulai} - {spesialisasi.jam_selesai}</p>
              </div>
              <Link to={`/user/reservasi/${spesialisasi.id}`} className="self-end px-6 py-2 font-medium text-left text-white rounded-lg bg-primary w-fit">reservasi</Link>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}

export default BerandaPage;
