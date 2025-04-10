import { JadwalDokterUmumRepository } from "@/repositories"
import { useQuery } from "@tanstack/react-query"

const useJadwalDokterUmumQueries = ({ id, page, limit, search } = {}) => {
  const jadwalDokterUmumQuery = useQuery({
    queryKey: ["jadwal-dokter-umum", { page, limit, search }],
    queryFn: () => JadwalDokterUmumRepository.getAll({ page, limit, search }),
  })

  const jadwalDokterUmumByIdQuery = useQuery({
    queryKey: ["jadwal-dokter-umum", { id }],
    queryFn: () => JadwalDokterUmumRepository.getById(id),
    enabled: !!id,
  })

  return { jadwalDokterUmumQuery, jadwalDokterUmumByIdQuery }
}

export default useJadwalDokterUmumQueries