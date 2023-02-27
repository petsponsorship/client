import axios from 'axios';
import { getCookie } from '../hook/cookies';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

instance.interceptors.request.use((config) => {
  const token = getCookie('user');

  if (token && config.headers) {
    config.headers['Authorization'] = token;
  }
  return config;
});
