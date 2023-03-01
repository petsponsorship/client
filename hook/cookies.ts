import { Cookies } from "react-cookie";

const cookies = new Cookies();


export const setCookie = (name:string, value, option) => cookies.set(name, value, { ...option });
export const getCookie = (name:string) => cookies.get(name);
export const removeCookie = (name: string, option) => cookies.remove(name, { ...option });