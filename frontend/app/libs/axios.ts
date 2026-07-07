import axios from "axios";
import { getCookieServer } from "@/utils/cookies";


const createApi = (baseURL:any) => {
    const api = axios.create({
        baseURL,
        withCredentials: true,
    });

    api.interceptors.request.use(async(config) => {
      const token =  await getCookieServer("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    return api;
};

export const Axios = createApi(
    "http://scoring.local/api"
);

