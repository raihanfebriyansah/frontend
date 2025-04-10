import api from "../api";

export const getAll = async ({ page, limit, search }) => {
  try {
    const response = await api.get("/reservasi/list", {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reservasi:", error);
    throw error;
  }
}

export const takeAll = async () => {
  try {
    const response = await api.get("/reservasi/list?all=true");
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error("Error fetching reservasi:", error);
    throw error;
  }
}

export const getById = async (id) => {
  try {
    const response = await api.get(`/reservasi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservasi by ID:", error);
    throw error;
  }
}

export const create = async (data) => {
  try {
    const response = await api.post("/reservasi/create", data);
    return response.data;
  } catch (error) {
    console.error("Error creating reservasi:", error);
    throw error;
  }
}

export const edit = async (data) => {
  try {
    const response = await api.put(`/reservasi/${data.id}`, data.formData);
    return response.data;
  } catch (error) {
    console.error("Error updating reservasi:", error);
    throw error;
  }
}

export const remove = async (id) => {
  try {
    const response = await api.delete(`/reservasi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting reservasi:", error);
    throw error;
  }
}