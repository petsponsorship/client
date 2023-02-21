import axios from "axios"

export const signUpApi = async (email, password, name, phoneNumber) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {email, password, name, phoneNumber})
}

export const loginApi = async (email, password) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {email, password})
}