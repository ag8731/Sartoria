export const setAuthToken = val => localStorage.setItem('sartoriatoken', val);
export const getAuthToken = () => localStorage.getItem('sartoriatoken') || null;

export const setCurrentUser = val => localStorage.setItem('sartoriauser', JSON.stringify(val));
export const getCurrentUser = () => {
  const sartoriaUserJSON = localStorage.getItem('sartoriauser');
  return sartoriaUserJSON ? JSON.parse(sartoriaUserJSON) : null;
};
