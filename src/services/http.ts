import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://reqres.in/api', 
  timeout: 5000, 
});

instance.interceptors.request.use(
  (config:InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    if (config.headers) { // Type guard to check if headers is defined
      const authDataJSON = localStorage.getItem('authData');
      if (authDataJSON) {
        const authData = JSON.parse(authDataJSON);
        const token = authData.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
