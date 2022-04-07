import { useState, useContext, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { ButtonLogin } from '../../../components/ButtonLogin';
import { AuthContext } from '../../../context/Authentication';
import { withSSRAuthLogged } from '../../../utils/withSSRAuthLogged';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';

import Router from 'next/router';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function Login() {
  const { loginEnterprise } = useContext(AuthContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ saveInformation, setSaveInformation ] = useState(false)

  useEffect(() => {
    const getEmail = localStorage.getItem('email');
    const getPassword = localStorage.getItem('password');
    const getSave = (localStorage.getItem('saveInformation') ? true : false);

    if(getEmail && getPassword){
      setEmail(getEmail);
      setPassword(getPassword);
      setSaveInformation(getSave);
    }
  }, [])

  const handleLogin = async (e: any) => {
    e.preventDefault();
    
    if(saveInformation){
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('saveInformation', JSON.stringify(saveInformation));
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('saveInformation');
    }

    try {
      await loginEnterprise({ email, password });
      Router.push('/error', '/professor/dashboard');
    } catch (err) {
      if(err.message === 'Usuário não cadastrado como EMPRESA, Por favor logue no portal do Paciente!'){
        toast.warn(`${err.message}`);
      } else {
        toast.warn('Email ou senha Incorreta!');
      }
    }
  }

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleLogin}
        className={styles.card}
        method="post"
      >
        
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="logo"/>
        </div>
        <h4>Apit Fhisio Terapia Quântionica</h4>

        <div 
          className={styles.containerInputs}
        >
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> 
          <RiLockPasswordFill className={styles.icons}/>
          <input 
            type="password" 
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <MdEmail className={styles.icons}/>

          <span>Entrar como Professor</span>
          
          <div className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={saveInformation ? true : false}
              onChange={(e) => setSaveInformation(!saveInformation)}
            /> 
            Salvar senha
          </div>

        </div>

        <div className={styles.containerButtons}>
            <a>
              <ButtonLogin 
                isLogin={true} 
                text="Fazer Login"
              />
            </a>
          <Link href="/" passHref>
            <a>
              <ButtonLogin isLogin={false} text="Esqueceu a senha? Clique aqui"/>
            </a>
          </Link>
          <Link href="/estudantes" passHref>
            <a>
              <ButtonLogin isLogin={false} text="Portal do Aluno/Paciente"/>
            </a>
          </Link>
        </div>

      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuthLogged(
  async (context) => {
    return {
      props: {}
    }
  }
);