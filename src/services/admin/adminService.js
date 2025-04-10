import api from '../api';

export const updateAdmin = async (id, payload) => {
  try {
    const response = await api.post(`/admin/update/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  catch (error) {
    console.error('Error updating admin:', error);
    throw error;
  }
};