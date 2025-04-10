import { FooterRepository } from "@/repositories";
import { useQuery } from "@tanstack/react-query";

const useFooterQueries = () => {
  const getById = useQuery({
    queryKey: ["footer"],
    queryFn: () => FooterRepository.getById(),
  })

  return {
    getById
  };
};

export default useFooterQueries;