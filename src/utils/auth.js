import Cookies from 'js-cookie';

export const setAuthToken = val => Cookies.set('sartoriatoken', val);
export const getAuthToken = () => Cookies.get('sartoriatoken') || null;

export const setCurrentUser = val => Cookies.set('sartoriauser', JSON.stringify(val));
export const getCurrentUser = () => {
  const sartoriaUserJSON = Cookies.get('sartoriauser');
  return sartoriaUserJSON ? JSON.parse(sartoriaUserJSON) : null;
};
