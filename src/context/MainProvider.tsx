import { useState, useEffect } from 'react';
import { MenuProvider } from './MenuContext';
import { AuthProvider } from './Authentication';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import ContainerDashboard from '../containers/dashboard';
import ContainerLoginERegister from '../containers/loginRegister';

export function MainProvider({ children }){
  const [ responsiveMenu, setResponsiveMenu ] = useState(false);
  const [ getHref, setGetHref ] = useState(false);
  const { asPath } = useRouter();
  const queryClient = new QueryClient();

  useEffect(() => {
    if(
      asPath === '/professor/cadastro' 
      || asPath === '/professor/cadastro/buscarMatriculas' 
      || asPath === '/professor/cadastro/buscarPacientes' 
      || asPath === '/professor/cadastro/cadastrarMatriculas' 
      || asPath === '/professor/cadastro/cadastrarPacientes' 
      || asPath === '/professor/cadastro/editarPaciente'
      || asPath === '/professor/dashboard' 
      || asPath === '/professor/seusDados'
    ){
      setGetHref(false)
    } else {
      setGetHref(true)
    }
  }, [asPath])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <MenuProvider menuClose={responsiveMenu} setMenuClose={setResponsiveMenu}>
            <ChakraProvider>
            <ToastContainer />
            {getHref &&
            <ContainerLoginERegister>
              {children}
            </ContainerLoginERegister>
            }
            {!getHref &&
              <ContainerDashboard responsiveMenu={responsiveMenu}>
              {children}
              </ContainerDashboard>
            }
            </ChakraProvider>
          </MenuProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
