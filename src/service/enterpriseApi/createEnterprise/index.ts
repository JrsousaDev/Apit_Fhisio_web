import { api } from '../../server';

interface IData{
  id?: string;
  defaultEmail?: string;
  enterpriseName?: string;
  enterpriseCNPJ?: string;
  enterpriseRegMunicipal?: string;
  enterpriseEmail?: string;
  enterprisePhone?: string;
  enterpriseTelephone?: string;
  enterpriseResponsibleName?: string;
  enterpriseCountry?: string;
  enterpriseAddressName?: string;
  enterpriseAddressNumber?: string;
  enterpriseCep?: string;
  enterpriseStreet?: string;
  enterpriseCity?: string;
  enterpriseState?: string;
}

export const createEnteprise = async (data: IData ) => {
  return await api.post('/enterprise/create-enterprise', {data});
}

