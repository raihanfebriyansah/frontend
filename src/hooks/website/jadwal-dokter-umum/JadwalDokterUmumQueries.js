import { PublicJadwalDokterUmumRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useJadwalDokterUmumQueries = () => {

  const jadwalDokterUmumTakeAllQueries = useQuery({
    queryKey: ["jadwal-dokter-umum-all"],
    queryFn: () => PublicJadwalDokterUmumRepository.takeAll(),
  });

  return { jadwalDokterUmumTakeAllQueries };
};

export default useJadwalDokterUmumQueries;