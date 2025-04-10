import api from "../api";

export const getAll = async ({ page, limit, search }) => {
  try {
    const response = await api.get("/spesialisasi/list", {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching spesialisasi:", error);
    throw error;
  }
}

export const takeAll = async () => {
  try {
    const response = await api.get("/spesialisasi/list?all=true");
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error("Error fetching spesialisasi:", error);
    throw error;
  }
}

export const getById = async (id) => {
  try {
    const response = await api.get(`/spesialisasi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching spesialisasi detail:", error);
    throw error;
  }
}

export const create = async (data) => {
  try {
    const response = await api.post("/spesialisasi/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error("up");
    throw error;
  }
}

export const edit = async (id, data) => {
  try {
    const response = await api.put(`/spesialisasi/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data
  } catch (error) {
    console.error("Error updating spesialisasi:", error);
    throw error;
  }
}

export const remove = async (id) => {
  try {
    const response = await api.delete(`/spesialisasi/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting spesialisasi:", error);
    throw error;
  }
}