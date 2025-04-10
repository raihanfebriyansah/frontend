import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  // pastikan baseURL tidak diakhiri dengan slash
  baseURL: import.meta.env.VITE_API_URL.replace(/\/$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('_auth');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
