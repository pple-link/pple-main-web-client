import axios, { AxiosInstance } from 'axios';
export const customAxios: AxiosInstance = axios.create({
  baseURL: 'https://pple-test.herokuapp.com',
  withCredentials: false,
});
