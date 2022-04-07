import { api } from '../../server';

interface IData{
  responsibleEnterpriseUser: string;
}

export const findAllPatients = async (data: IData) => {
  return await api.post('/patient/find', {data});
}