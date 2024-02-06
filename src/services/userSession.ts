import { ILogin, ILoginResponse } from '../models/ILogin';
import { IRegister, IRegisterResponse } from '../models/IRegister';

import http from './http';

export const loginUser = (login: ILogin): Promise<ILoginResponse> => {
  return http.post<ILoginResponse>(`/login`, login)
    .then(response => response.data)
    .catch(error => {
        throw error.response.data.error;
      });
};

export const registerUser = (register: IRegister): Promise<IRegisterResponse> => {
  return http.post<IRegisterResponse>(`/register`, register)
    .then(response => response.data)
    .catch(error => {
        throw error.response.data.error;
      });
};
