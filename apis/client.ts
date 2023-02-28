import axios from "axios";
import { getCookie, setCookie } from "../hook/cookies"

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        withCredentials: true,
    }
})

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
async (err) => {
    const originalConfig = err.config;
    if(err.response){
        if(err.response.status === 401 && !originalConfig._retry){
            originalConfig._retry = true;

            try {
                const res = await instance.post('', {
                    headers : {
                        RefreshToken : getCookie("refreshToken")
                    }
                });
                console.log("리프레쉬 토큰",res);
                const access = res.data.accessToken;
                // const refresh = res.data.refreshToken;

                setCookie("Authorization", access, {})
                // setCookie()
                return instance(originalConfig);
            } catch (_error){
                if(_error.response && _error.response.data) {
                    return Promise.reject(_error.response.data);
                }
            }
            return Promise.reject(err)
        }
    }

})
