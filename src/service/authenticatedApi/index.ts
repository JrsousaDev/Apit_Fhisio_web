import { api } from '../../service/server';

export const createAuthentication = async (email: string, password: string) => {
  return await api.post('/user/login', {email, password});
}

