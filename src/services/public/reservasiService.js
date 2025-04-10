import api from "../api";

export const reservasi = async (id, payload) => {
  try {
    const response = await api.post(`/reservasi/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching reservasi:", error);
    throw error;
  }
}