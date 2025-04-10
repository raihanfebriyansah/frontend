import api from "../api";

export const takeAll = async () => {
  try {
    const response = await api.get("/public/jadwal-dokter-umum/list?all=true");
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error("Error fetching jadwal dokter umum:", error);
    throw error;
  }
}