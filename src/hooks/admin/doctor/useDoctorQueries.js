import { DoctorRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useDoctorQueries = ({ id, page, limit, search } = {}) => {
  const doctorQuery = useQuery({
    queryKey: ["doctor", { page, limit, search }],
    queryFn: () => DoctorRepository.getAll({ page, limit, search }),
  });

  const doctorByIdQuery = useQuery({
    queryKey: ["doctor-detail", id],
    queryFn: () => DoctorRepository.getById(id),
    enabled: !!id,
  });

  const doctorTakeAllQueries = useQuery({
      queryKey: ["doctor-take-all"],
      queryFn: () => DoctorRepository.takeAll(),
    });

  return { doctorQuery, doctorByIdQuery, doctorTakeAllQueries };
};

export default useDoctorQueries;