import { footerService } from "@/services";

export const getById = async () => {
  const response = await footerService.getById();
  return response;
}

export const update = async (data) => {
  const response = await footerService.update(data);
  return response;
}