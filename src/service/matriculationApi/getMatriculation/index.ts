import { api } from '../../server';

interface IData{
  responsibleEnterpriseUser: string;
}

export const getMatriculation = async (data: IData) => {
  return await api.post('/matriculation/find', {data});
}

