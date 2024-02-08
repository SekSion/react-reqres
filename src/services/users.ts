import { IListResponse, IUserResponse, IUsers } from '../models/IUsers';
import http from './http';

export const listUsers = (page?: number): Promise<IListResponse> => {
    const queryParams = page ? `?page=${page}` : '';
    return http.get<IListResponse>(`/users${queryParams}`)
      .then(response => response.data)
      .catch(() => {
        throw new Error('Failed to list users');
      });
  };

export const createUser = (user: IUsers): Promise<IUserResponse> => {
  return http.post<IUserResponse>('/users', user)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Failed to create user');
    });
};

export const updateUser = (id: number, user: IUsers): Promise<IUserResponse> => {
  return http.put<IUserResponse>(`/users/${id}`, user)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Failed to update user');
    });
};

export const deleteUser = (id: number): Promise<void> => {
  return http.delete(`/users/${id}`)
    .then(() => {})
    .catch(() => {
      throw new Error('Failed to delete user');
    });
};
