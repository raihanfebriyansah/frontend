import api from '../api';

export const updateAdmin = async (id, formData) => {
  if (!id) {
    throw new Error("ID is required to update the admin.");
  }
  try {
    const response = await api.post(`/admin/update/${id}`, formData, {
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