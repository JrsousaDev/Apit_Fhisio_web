import { api } from '../../server';

export const getOneUser = async (id: string) => {
  return await api.post('/user/find', {id});
}

