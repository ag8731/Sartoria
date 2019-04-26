import Cookies from 'js-cookie';

export const getAuthToken = () => Cookies.get('sartoriatoken');
export const setAuthToken = val => Cookies.set('sartoriatoken', val);
