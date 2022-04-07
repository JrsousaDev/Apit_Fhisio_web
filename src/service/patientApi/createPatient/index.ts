import { api } from '../../server';

interface IData{
  id?: string;
  defaultEmail?: string;
  name?: string;
  birthDate?: string;
  gender?: string;
  responsibleName?: string;
  cpf?: string;
  customerPortal?: boolean;
  email?: string;
  addressName?: string;
  numberAndComplement?: string;
  street?: string;
  cityAndState?: string;
  cep?: string;
  phone?: string;
  telephone?: string;
  profession?: string;
  heKnew?: string;
  observation?: string;
}

export const createPatient = async (data: IData) => {
  return await api.post('/patient/create', {data});
}

