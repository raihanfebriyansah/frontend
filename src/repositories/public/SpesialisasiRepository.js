import { publicSpesialisasiService } from "@/services";

export const takeAll = async () => {
  const response = await publicSpesialisasiService.takeAll();
  return response;
}

export const getById = async (id) => {
  const response = await publicSpesialisasiService.getById(id);
  return response;
}