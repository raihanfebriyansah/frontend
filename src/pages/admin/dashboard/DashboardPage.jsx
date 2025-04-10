import useSpesialisasiQueries from "@/hooks/admin/spesialisasi/useSpesialisasiQueries";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { spesialisasiTakeAllQueries } = useSpesialisasiQueries();
  if (spesialisasiTakeAllQueries.isLoading) return <div className="mt-10 text-center">Loading...</div>;
  if (spesialisasiTakeAllQueries.error) return <div className="mt-10 text-center text-red-500">Error fetching data</div>;

  return (
    <>
      <header className="px-12 py-10 capitalize">
        <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      </header>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {spesialisasiTakeAllQueries.data?.map((spesialisasi) => (
          <article key={spesialisasi.id} className="p-6 bg-white rounded-lg shadow-md">
            <figure className="h-[250px] anchor-center">
              <img src={spesialisasi.fotoUrl ? spesialisasi.fotoUrl : "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="} alt="baby" className="object-cover object-center w-full h-full rounded-t-lg" />
            </figure>
            <div className="flex flex-col gap-5 p-5">
              <h2 className="text-xl font-semibold">{spesialisasi.nama}</h2>
              <Link to="/admin/reservasi" className="self-end px-6 py-2 font-medium text-left text-white rounded-lg bg-primary w-fit">lihat antrean</Link>
            </div>
          </article>
        ))}
        {spesialisasiTakeAllQueries.isPending && (
          <div className="flex items-center justify-center h-full col-span-3">
            <p className="text-xl font-semibold">Loading...</p>
          </div>
        )}
      </section>
    </>
  );
}

export default DashboardPage;