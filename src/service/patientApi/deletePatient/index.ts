import { api } from '../../server';

interface IData{
  responsibleEnterpriseUser: string;
  email: string;
}

export const deleteOnePatient = async (data: IData) => {
  return await api.post('/patient/delete', {data});
}

