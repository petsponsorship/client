import axios from 'axios';

export const fetchCategoryData = async (species:string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts?species=${species}`)
    return response.data;
}