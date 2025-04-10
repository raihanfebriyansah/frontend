import api from "../api";

export const getAll = async ({ page, limit, search }) => {
  try {
    const response = await api.get("/jadwal-dokter-umum/list", {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jadwal dokter umum:", error);
    throw error;
  }
}

export const getById = async (id) => {
  try {
    const response = await api.get(`/jadwal-dokter-umum/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jadwal dokter umum by ID:", error);
    throw error;
  }
}

export const create = async (data) => {
  try {
    const response = await api.post("/jadwal-dokter-umum/create", data);
    return response.data;
  } catch (error) {
    console.error("Error creating jadwal dokter umum:", error);
    throw error;
  }
}

export const edit = async (id, data) => {
  try {
    const response = await api.put(`/jadwal-dokter-umum/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating jadwal dokter umum:", error);
    throw error;
  }
}

export const remove = async (id) => {
  try {
    const response = await api.delete(`/jadwal-dokter-umum/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting jadwal dokter umum:", error);
    throw error;
  }
}
