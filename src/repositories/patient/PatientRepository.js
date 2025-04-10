import { patientService } from "@/services";


export const getAll = async ({ page, limit, search }) => {
  const response = await patientService.getAll({ page, limit, search });
  return response;
}

export const getById = async (id) => {
  const response = await patientService.getById(id);
  return response;
}

export const create = async (data) => {
  const { image, spesialisasiId, name, active, ...others } = data;
  const payload = {
    nama: name,
    spesialisasiId: spesialisasiId,
    aktif: active,
    ...others
  };

  if (image && image.length > 0 && image[0] instanceof File) {
    payload.foto = image[0];
  }

  const response = await patientService.create(payload);
  return response;
}

export const edit = async (id, data) => {
  const { image, spesialisasiId, name, active, ...others } = data;
  const payload = {
    nama: name,
    spesialisasiId: spesialisasiId,
    aktif: active,
    ...others
  };

  if (image && image.length > 0 && image[0] instanceof File) {
    payload.foto = image[0];
  }

  const response = await patientService.edit(id, payload);
  return response;
}

export const remove = async (id) => {
  const response = await patientService.remove(id);
  return response;
}

export const uploadFoto = async (id, formData) => {
  const { image } = formData;
  const payload = {
    foto: image[0],
  };

  if (image && image.length > 0 && image[0] instanceof File) {
    payload.foto = image[0];
  }
  const response = await patientService.uploadFoto(id, payload);
  return response;
}