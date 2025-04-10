import { PublicRiwayatRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useRiwayatQueries = ({ id } = {}) => {
  const riwayatQuery = useQuery({
    queryKey: ["riwayat"],
    queryFn: () => PublicRiwayatRepository.getRiwayat(),
  });

  const RiwayatByIdQuery = useQuery({
    queryKey: ["riwayat", id],
    queryFn: () => PublicRiwayatRepository.getRiwayatById(id),
    enabled: !!id // query hanya dijalankan jika id tersedia
  });

  return {
    riwayatQuery, RiwayatByIdQuery
  };

}
export default useRiwayatQueries;