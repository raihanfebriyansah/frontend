import api from "../api";

export const getAll = async ({ page, limit, search }) => {
  try {
    const response = await api.get("/patient/list", {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
}

export const getById = async (id) => {
  try {
    const response = await api.get(`/patient/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    throw error;
  }
}

export const create = async (data) => {
  try {
    const response = await api.post("/patient/create", data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
}

export const edit = async (id, data) => {
  try {
    const response = await api.put(`/patient/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
}

export const remove = async (id) => {
  try {
    const response = await api.delete(`/patient/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
}

export const uploadFoto = async (id, formData) => {
  try {
    const response = await api.post(`/patient/uploadFoto/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
  catch (error) {
    console.error("Error uploading patient photo:", error);
    throw error;
  }
}