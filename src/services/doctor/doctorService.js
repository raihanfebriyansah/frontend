import api from "../api";

export const getAll = async ({ page, limit, search }) => {
  try {
    const response = await api.get("/doctor/list", {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
}

export const takeAll = async () => {
  try {
    const response = await api.get("/doctor/list?all=true");
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
}

export const getById = async (id) => {
  try {
    const response = await api.get(`/doctor/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    throw error;
  }
}

export const create = async (data) => {
  try {
    const response = await api.post("/doctor/create", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
}

export const edit = async (id, data) => {
  try {
    const response = await api.put(`/doctor/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
}

export const remove = async (id) => {
  try {
    const response = await api.delete(`/doctor/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
}

export const uploadFoto = async (id, formData) => {
  try {
    const response = await api.put(`/doctor/uploadFoto/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
  catch (error) {
    console.error("Error uploading doctor photo:", error);
    throw error;
  }
}