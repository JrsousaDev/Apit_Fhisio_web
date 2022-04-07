import { Alert, AlertIcon, GridItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/Authentication';
import { GetServerSideProps } from 'next';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { parseCookies } from 'nookies';
import { getAPIClient } from '../../../service/axios';
import { IDecodToken } from '../../../utils/interfaces';
import { jwtDecode } from '../../../utils/jwtDecode';

import CardBoard from '../../../components/CardBoad';

import styles from './styles.module.scss';

export default function DashBoard(props) {
  const { user } = useContext(AuthContext);

  return(
    <GridItem rowSpan={2} colSpan={2} h='100%' className={styles.main}>
      <div className={styles.header}>
        <h1>Dashboard</h1> 
          <Alert status='success'>
            <AlertIcon />
            Seja bem-vindo(a) {user?.name}!
          </Alert>
      </div>

      <hr />

      <div className={styles.body}>

      <div className={styles.cards}>
        <CardBoard 
          textActive="Pacientes Ativos"
          textChurn="Pacientes Excluídos" 
          actives={props.patients?.length || '0'}
          isChurn={true}
          bgColor="#17a2b7"
          color="white"
          churns="0" 
          link='/professor/cadastro/buscarPacientes'
        />
        <CardBoard 
          textActive="Matrículas Ativas"
          textChurn="Matrículas Canceladas" 
          actives={props.matriculations?.length || '0'} 
          isChurn={true}
          bgColor="#27a844"
          color="white"
          churns="0" 
          link='/professor/cadastro/buscarMatriculas'
        />
{/*         <CardBoard 
          textActive="Avaliações Cadastradas" 
          actives="1" 
          isChurn={false}
          bgColor="#fec107"
          color="black" 
        />  */}
      </div>

      </div>
    </GridItem>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { ['apitFhisioToken']: token } = parseCookies(ctx);

    const user: IDecodToken = jwtDecode(token);

    const data = {
      responsibleEnterpriseUser: user.id
    }


    const response = await apiClient.post('/patient/find', {data});
    const responseTwo = await apiClient.post('/matriculation/find', {data})

    const patients = response.data.map(patient => {
      return {
        name: patient.name
      }
    });

    const matriculations = responseTwo.data.map(matriculation => {
      return {
        modality: matriculation.modality
      }
    })

    return {
      props: {
        patients,
        matriculations
      }
    } 
  }
); 