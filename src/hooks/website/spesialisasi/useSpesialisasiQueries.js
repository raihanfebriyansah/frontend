import { PublicSpesialisasiRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useSpesialisasiQueries = ({ id } = {}) => {
  const spesialisasiTakeAllQueries = useQuery({
    queryKey: ["spesialisasi-all"],
    queryFn: () => PublicSpesialisasiRepository.takeAll(),
  });

  const spesialisasiByIdQuery = useQuery({
    queryKey: ["spesialisasi-detail", id],
    queryFn: () => PublicSpesialisasiRepository.getById(id),
    enabled: !!id,
  });

  return { spesialisasiTakeAllQueries, spesialisasiByIdQuery };
};

export default useSpesialisasiQueries;