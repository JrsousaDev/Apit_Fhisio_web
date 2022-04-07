import { api } from '../../server';

interface IData{
  defaultUserEmail?: string;
  userName?: string;
  userCPF?: string;
  userEmail?: string;
  userPhone?: string;
  userTelephone?: string;
  id?: string;
}

export const updateUser = async (data: IData) => {

  if(!data.userEmail){
    data.userEmail = data.defaultUserEmail
  }

  data.userEmail = data.userEmail?.toLowerCase(); 
  return await api.post('/user/update', {data});
}

