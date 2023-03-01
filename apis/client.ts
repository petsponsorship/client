import axios from "axios";
import { config } from "process";
import { getCookie, removeCookie, setCookie } from "../hook/cookies"

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

instance.interceptors.request.use((config) =>{
    if(!config.headers) return config;
    const accesstoken = getCookie("Authorization")

    if(accesstoken && config.headers) {
        config.headers["Authorization"] = `${accesstoken}`;
    }
    return config;
})

instance.interceptors.response.use(
    (res)=>{
    return res;
},
async (error) => {

    if(error.config && error.response && error.response.status === 401){
        error.config._retry = true;
        const refreshtoken =getCookie("refreshToken");
        error.config.headers.RefreshToken=`${refreshtoken}`
        return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers : {
                RefreshToken : `${refreshtoken}`
            }
        }).then( async(res)=>{
            if(res.data && res.data.accessToken){
                setCookie("Authorization",res.data.accessToken,{})
                 const accesstoken = getCookie("Authorization")
                 console.log("엑세스토큰발급",accesstoken )
                error.config.headers["Authorization"] = `${accesstoken}`;
                return instance.request(error.config)}
        })
    }
    return Promise.reject(error)

     


})
