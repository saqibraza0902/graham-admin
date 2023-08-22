import { store } from "@/redux/store";
import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = store.getState().auth?.token;
    // const accessToken = Cookies.get('access_token');
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";

    return Promise.resolve(config);
  },
  (err) => {
    return Promise.reject(err);
  }
);
