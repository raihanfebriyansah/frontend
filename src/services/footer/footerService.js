import api from "../api";

export const getById = async () => {
  try {
    const response = await api.get(`/footer/1`);
    return response.data;
  } catch (error) {
    console.error("Error fetching footer by ID:", error);
    throw error;
  }
};

export const update = async (data) => {
  try {
    const response = await api.put(`/footer/1`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating footer:", error);
    throw error;
  }
};