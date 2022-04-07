import { api } from '../../server';

interface IData{
  responsibleEnterpriseUser?: string;
  patientName?: string;
  physicalTherapist?: string;
  dateMatriculation?: string;
  expiryDay?: string;
  firstPaymentDay?: string;
  enrollmentFee?: string;
  billingMethod?: string;
  enrollmentValue?: string;
  modality?: string;
  sessionRoom?: string;
  enrollmentPlan?: string;
  observation?: string;
  dayOfSessions?: string;
  dueDate?: string;
  singleTime?: boolean;
}

export const createMatriculation = async (data: IData) => {
  return await api.post('/matriculation/create', {data});
}

