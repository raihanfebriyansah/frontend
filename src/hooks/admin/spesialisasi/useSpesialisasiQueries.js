import { SpesialisasiRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useSpesialisasiQueries = ({ id, page, limit, search } = {}) => {
  const spesialisasiQuery = useQuery({
    queryKey: ["spesialisasi", { page, limit, search }],
    queryFn: () => SpesialisasiRepository.getAll({ page, limit, search }),
  });

  const spesialisasiByIdQuery = useQuery({
    queryKey: ["spesialisasi-detail", id],
    queryFn: () => SpesialisasiRepository.getById(id),
    enabled: !!id,
  });
  const spesialisasiTakeAllQueries = useQuery({
    queryKey: ["spesialisasiAll"],
    queryFn: () => SpesialisasiRepository.takeAll(),
  });

  return { spesialisasiQuery, spesialisasiByIdQuery, spesialisasiTakeAllQueries };
};

export default useSpesialisasiQueries;