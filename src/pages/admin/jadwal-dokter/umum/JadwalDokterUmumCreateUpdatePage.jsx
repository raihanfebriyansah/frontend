import JadwalDokterUmumForm from "@/components/jadwal-dokter/umum/JadwalDokterUmumForm";
import useJadwalDokterUmumQueries from "@/hooks/admin/jadwal-dokter/umum/useJadwalDokterUmumQueries";
import { useParams } from "react-router-dom";

const JadwalDokterUmumCreateUpdatePage = () => {
  const { id } = useParams();
  const formMode = id ? "edit" : "create";
  const { jadwalDokterUmumByIdQuery } = useJadwalDokterUmumQueries({ id: id });

  return (
    <JadwalDokterUmumForm data={jadwalDokterUmumByIdQuery.data} formMode={formMode} />
  );
};

export default JadwalDokterUmumCreateUpdatePage;