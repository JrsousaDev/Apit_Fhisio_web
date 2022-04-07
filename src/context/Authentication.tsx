import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createAuthentication } from "../service/authenticatedApi";
import { api } from '../service/server';
import { useRouter } from "next/router";
import { jwtDecode } from "../utils/jwtDecode";
import { IDecodToken } from "../utils/interfaces";

type User = {
  id: string;
  name: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  loginEnterprise: (data: SignInData) => Promise<void>
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }){
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'apitFhisioToken' : token } = parseCookies();
    let informationUser: IDecodToken;
    let user;

    if (token) { 
      informationUser = jwtDecode(token);
      const { id, name } = informationUser;
      user = { id, name }
    }

    if (token && user) {
      setUser(user)
      api.defaults.headers['authorization'] = `Bearer ${token}`;
    } else {
      destroyCookie(null, 'apitFhisioToken');
      api.defaults.headers['authorization'] = null;
    }
  }, [])

  async function loginEnterprise({ email, password }: SignInData) {
    
    const response = await createAuthentication(email, password);
    const { token, user } = response.data

    if(!user){
      throw new Error('Email ou senha Incorreta')
    }

    if(user.typeUser !== 'EMPRESA'){
      throw new Error('Usuário não cadastrado como EMPRESA, Por favor logue no portal do Paciente!')
    }

    setCookie(undefined, 'apitFhisioToken', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers['authorization'] = `Bearer ${token}`;
  
    setUser(user);
  }

  async function logout() {
    destroyCookie(null, 'apitFhisioToken');

    router.push('/professor/login');
  }

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated,
        user,
        loginEnterprise,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}