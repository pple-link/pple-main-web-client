import axios, { AxiosInstance } from 'axios';
export const customAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  withCredentials: false,

});
