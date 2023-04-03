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

export const editApi = (id: string, data: IFormInput) => {
  return instance.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, data);
};

export const imageApi = (data: { img: File }) => {
  return instance.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/img`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const likeApi = ({ id: postId, invalidRequest }) => {
  if (invalidRequest) return;
  return instance.post(`${process.env.NEXT_PUBLIC_API_URL}/like`, { postId });
};

export const deleteApi = (id: number) => {
  const deleteConfirm = confirm('게시글을 삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?');
  if (!deleteConfirm) return;
  return instance.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
};
