import { store } from '@redux/store';
import axios, { AxiosError } from 'axios';

const Service = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_DEV_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Service.interceptors.request.use(
  (config: any) => {
    const adminToken = store.getState().adminAuthData?.adminJwtToken;
    const userToken = store.getState().userLoginData?.userJwtToken;
    const partnerToken = store.getState().partnerAuthData?.partnerJwtToken;
    // const userToken = store.getState().userLogin.userJwtToken;

    const token = adminToken || userToken || partnerToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default Service;
