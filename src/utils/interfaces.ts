export interface IUser extends Document {
  _id: string;
  name: string;
  cpf: string;
  contact: {
    email: string;
    phone: string;
    telephone: string;
  }
  address: {
    state: string;
    city: string;
    street: string;
  }
  enterprise: {
    cnpj: string;
    name: string;
    regMunicipal: string;
    responsibleName: string;
    contact: {
      email: string;
      phone: string;
    }
    address: {
      state: string;
      city: string;
      cep: string;
      number: string;
      addressName: string;
      country: string;
      street: string;
    }
  }
}

export interface IDecodToken {
  id?: string;
  name?: string;
}


export interface IRowData {
  name: string;
  email: string;
}