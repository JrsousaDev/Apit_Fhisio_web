import { api } from '../../server';

interface IData{
  id?: string;
  defaultPatientId?: string;
  defaultPatientEmail?: string;
  patientName?: string;
  patientBirthDate?: string;
  patientGender?: string;
  patientResponsibleName?: string;
  patientCPF?: string;
  patientCustomerPortal?: boolean;
  patientEmail?: string;
  patientAddressName?: string;
  patientNumberAndComplement?: string;
  patientStreet?: string;
  patientCityAndState?: string;
  patientCep?: string;
  patientPhone?: string;
  patientTelephone?: string;
  patientProfession?: string;
  patientHeKnew?: string;
  patientObservation?: string;
}

export const updatePatient = async (data: IData) => {
  return await api.post('/patient/update', {data});
}