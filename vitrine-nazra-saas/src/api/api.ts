import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const BASE_URL_BACKEND = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
    baseURL:BASE_URL_BACKEND,
    headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
    },
    timeout:10000
})

api.interceptors.response.use(
  (response: AxiosResponse) => response.data, 
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;


export const sendEmailSub = async (email : string)=>{
    return api.post(`/api/email-subscription`,{email})
}


export const signIn = async (user:object)=>{
    return api.post(`/api/sign-in`,user);
}

export const logIn = async (user:object)=>{
    return api.post(`/api/log-in`,user);
}

export const getBlogs = async ()=>{
    return api.get(`/api/get-blogs`);
}

export const trackVisitor = async (userId:string)=>{
    return api.post(`/api/track-visitor`,{userId});
}