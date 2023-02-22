import { instance } from './client';

export const fetchCategoryData = async (species:string) => {
    const response = await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/posts?species=${species}`)
    return response.data;
}