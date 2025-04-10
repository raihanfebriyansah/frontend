import { jadwalDokterUmumService } from "@/services";

export const getAll = async ({ page, limit, search }) => {
  const response = await jadwalDokterUmumService.getAll({ page, limit, search });
  return response;
}

export const getById = async (id) => {
  const response = await jadwalDokterUmumService.getById(id);
  return response;
}

export const create = async (data) => {
  console.log(data)
  const response = await jadwalDokterUmumService.create(data);
  return response;
}

export const edit = async (id, data) => {
  const response = await jadwalDokterUmumService.edit(id, data);
  return response;
}

export const remove = async (id) => {
  const response = await jadwalDokterUmumService.remove(id);
  return response;
}