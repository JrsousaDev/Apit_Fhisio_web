import { api } from '../../server';

interface IData{
  responsibleEnterpriseUser: string;
  idMatriculation: string;
  emailPatient: string;
}

export const deleteOneMatriculation = async (data: IData) => {
  return await api.post('/matriculation/delete', {data});
}

