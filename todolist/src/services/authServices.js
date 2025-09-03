import axiosInstance from './axiosConfig';

// Registrazione utente
export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

// Login utente
export const login = async (userData) => {
  const response = await axiosInstance.post('/auth/login', userData);
  return response.data;
};

// Logout (solo frontend, cancella token localmente)
export const logout = () => {
  localStorage.removeItem('token');
};
