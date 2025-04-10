import { PublicJadwalDokterSpesialisasiRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useJadwalDokterSpesialisasiQueries = () => {

  const jadwalDokterSpesialisasiTakeAllQueries = useQuery({
    queryKey: ["jadwal-dokter-spesialisasi-all"],
    queryFn: () => PublicJadwalDokterSpesialisasiRepository.takeAll(),
  });

  return { jadwalDokterSpesialisasiTakeAllQueries };
};

export default useJadwalDokterSpesialisasiQueries;