import { instance } from './client';
import { IFormInput } from '../component/writepage/write/WriteMainSection';

export const getPostDataApi = (id: string | string[]) => {
  return instance.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
};

export const writeApi = (data: IFormInput) => {
  return instance.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const imageApi = (data: { img: File }) => {
  return instance.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/img`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const likeApi = (postId: string) => {
  return instance.post(`${process.env.NEXT_PUBLIC_API_URL}/like`, { postId });
};
