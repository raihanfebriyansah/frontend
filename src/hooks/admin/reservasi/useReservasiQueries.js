import { ReservasiRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useReservasiQueries = ({ id, page, limit, search } = {}) => {
  const reservasiQuery = useQuery({
    queryKey: ["reservasi", { page, limit, search }],
    queryFn: () => ReservasiRepository.getAll({ page, limit, search }),
  });

  const reservasiByIdQuery = useQuery({
    queryKey: ["reservasi-detail", id],
    queryFn: () => ReservasiRepository.getById(id),
    enabled: !!id,
  });

  const reservasiTakeAllQueries = useQuery({
    queryKey: ["reservasi-take-all"],
    queryFn: () => ReservasiRepository.takeAll(),
  });

  return { reservasiQuery, reservasiByIdQuery, reservasiTakeAllQueries };
};

export default useReservasiQueries;