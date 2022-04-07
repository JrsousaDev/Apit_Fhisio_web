import { api } from '../../server';

interface IData{
  id?: string;
  defaultEnterpriseEmail?: string;
  defaultEnterpriseCNPJ?: string;
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

export const updateEnterprise = async (data: IData) => {

  if (!data.enterpriseEmail) {
    data.enterpriseEmail = data.defaultEnterpriseEmail
  }

  data.enterpriseEmail = data.enterpriseEmail?.toLowerCase();
  return await api.post('/enterprise/update', {data});
}

