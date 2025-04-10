import { reservasiService } from "@/services"

export const getAll = async ({ page, limit, search }) => {
  const response = await reservasiService.getAll({ page, limit, search });
  return response;
}

export const takeAll = async () => {
  const response = await reservasiService.takeAll();
  return response;
}

export const getById = async (id) => {
  const response = await reservasiService.getById(id);
  return response;
}

export const create = async (data) => {
  const response = await reservasiService.create(data);
  return response;
}

export const edit = async (data) => {
  const response = await reservasiService.edit(data);
  return response;
}

export const remove = async (id) => {
  const response = await reservasiService.remove(id);
  return response;
}