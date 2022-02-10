import axios from 'axios';
import { getAccessToken } from './accessToken';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config!.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
