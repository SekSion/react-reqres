import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://reqres.in/api', 
  timeout: 5000, 
});

export default instance;