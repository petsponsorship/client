import { instance } from "./client"

export const getAllNumDataApi = async () => {
    return await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/my`)
}

export const getMyWriteListApi = async(userId : number) => {
    return await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/posts?user=${userId}`)
}

export const getMySupportListApi = async () => {
    return await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/support`)
}

export const getMylikeListApi = async () => {
    return await instance.get(`${process.env.NEXT_PUBLIC_API_URL}/like`)
}