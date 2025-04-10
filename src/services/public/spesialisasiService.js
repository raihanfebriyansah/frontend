import api from "../api";

export const takeAll = async () => {
  try {
    const response = await api.get("/public/spesialisasi/list?all=true");
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error("Error fetching spesialisasi:", error);
    throw error;
  }
}

export const getById = async (id) => {
  try {
    const response = await api.get(`/public/spesialisasi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching spesialisasi by ID:", error);
    throw error;
  }
}