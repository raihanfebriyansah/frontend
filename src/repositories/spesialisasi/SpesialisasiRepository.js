import { spesialisasiService } from "@/services"

export const getAll = async ({ page, limit, search }) => {
  const response = await spesialisasiService.getAll({ page, limit, search });
  return response;
}

export const getById = async (id) => {
  const response = await spesialisasiService.getById(id);
  return response;
}

export const takeAll = async () => {
  const response = await spesialisasiService.takeAll();
  return response;
}

export const create = async (data) => {
  const { name, start_time, end_time, days, active, estimated_time, image, ...others } = data;
  const payload = {
    nama: name,
    jam_mulai: start_time,
    jam_selesai: end_time,
    hari: days,
    aktif: active,
    estimasi: estimated_time,
    ...others
  };

  if (image && image.length > 0 && image[0] instanceof File) {
    payload.foto = image[0];
  }

  const response = await spesialisasiService.create(payload);
  return response;
}

export const edit = async (id, data) => {
  const { name, start_time, end_time, days, active, estimated_time, image, ...others } = data;
  const payload = {
    nama: name,
    jam_mulai: start_time,
    jam_selesai: end_time,
    hari: days,
    aktif: active,
    estimasi: estimated_time,
    ...others
  };

  if (image && image.length > 0 && image[0] instanceof File) {
    payload.foto = image[0];
  }

  const response = await spesialisasiService.edit(id, payload);
  return response;
}

export const remove = async (id) => {
  const response = await spesialisasiService.remove(id);
  return response;
}