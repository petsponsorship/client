import { instance } from './client';
import { IFormInput } from '../component/writepage/write/WriteMainSection';

export const getPostDataApi = async (id: string | string[]) => {
  return instance.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
};

export const writeApi = async (data: IFormInput) => {
  return instance.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
