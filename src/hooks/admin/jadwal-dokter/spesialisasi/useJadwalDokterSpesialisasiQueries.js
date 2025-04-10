import { JadwalDokterSpesialisasiRepository } from "@/repositories"
import { useQuery } from "@tanstack/react-query"

const useJadwalDokterSpesialisasiQueries = ({id, page, limit, search } = {}) => {
  const jadwalDokterSpesialisQuery = useQuery({
    queryKey: ["jadwal-dokter-spesialisasi", { page, limit, search }],
    queryFn: () => JadwalDokterSpesialisasiRepository.getAll({ page, limit, search }),
  })

  const jadwalDokterSpesialisByIdQuery = useQuery({
    queryKey: ["jadwal-dokter-spesialisasi", { id }],
    queryFn: () => JadwalDokterSpesialisasiRepository.getById(id),
    enabled: !!id,
  })

  return { jadwalDokterSpesialisQuery, jadwalDokterSpesialisByIdQuery }
}

export default useJadwalDokterSpesialisasiQueries