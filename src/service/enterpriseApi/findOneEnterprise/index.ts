import { api } from '../../server';

export const getOneEnterprise = async (enterpriseCNPJ: string) => {
  return await api.post('/enterprise/findOne', {enterpriseCNPJ});
}

