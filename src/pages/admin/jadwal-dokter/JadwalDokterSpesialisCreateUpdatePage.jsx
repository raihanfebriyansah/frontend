import JadwalDokterSpesialisForm from "@/components/jadwal-dokter/spesialisasi/JadwalDokterSpesialisForm";
import useJadwalDokterSpesialisasiQueries from "@/hooks/admin/jadwal-dokter/spesialisasi/useJadwalDokterSpesialisasiQueries";
import { useParams } from "react-router-dom";

const JadwalDokterSpesialisCreateUpdatePage = () => {
  const { id } = useParams();
  const formMode = id ? "edit" : "create";
  const { jadwalDokterSpesialisByIdQuery } = useJadwalDokterSpesialisasiQueries({ id: id });

  return (
    <JadwalDokterSpesialisForm data={jadwalDokterSpesialisByIdQuery.data} formMode={formMode} />
  );
};

export default JadwalDokterSpesialisCreateUpdatePage;