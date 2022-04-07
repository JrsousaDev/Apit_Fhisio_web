import {
  Box, GridItem, FormLabel, Input
} from '@chakra-ui/react';
import { withSSRAuth } from '../../../../utils/withSSRAuth';
import { GetServerSideProps } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { getAPIClient } from '../../../../service/axios';
import { IDecodToken } from '../../../../utils/interfaces';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/Authentication';
import { createMatriculation } from '../../../../service/matriculationApi/createMatriculation';
import { toast } from 'react-toastify';
import { TiArrowBack } from 'react-icons/ti';

import InputMask from 'react-input-mask';
import ButtonAddPatients from '../../../../components/ButtonAdd/index';
import jwtDecode from 'jwt-decode';

import styles from './styles.module.scss';

export default function RegistrationEnrollments(props) {
  const { user } = useContext(AuthContext)
  const [ formValues, setFormValues ] = useState({});
  const [ isDisable, setIsDisable ] = useState(true);
  
  const getFormValues = (value: any) => {
    setIsDisable(false)
    setFormValues((oldValues) => (
      {
        ...oldValues,
        [value.target.name]: value.target.value,
        responsibleEnterpriseUser: user.id,
      }
    ));
  }

  const addMatriculation = async () => {

    try {
      await createMatriculation(formValues);
      toast.success('Matriculada criada com sucesso com sucesso!');
    } catch (err) {
      toast.warn('Por favor, preencha todos os campos ou Paciente já está matriculado!');
    }

  }

  return(
  <GridItem rowSpan={2} colSpan={2} h="100%" className={styles.main}>

    <h1 className={styles.pagTitle}>Inserir <span>Matrícula</span></h1>

    <p>
      Aqui você faz o Contrato com seu Paciente. Informa quando iniciam os serviços prestados, 
      valores, renovação. Algumas empresas chamam de Contrato, Cadastro de Plano, nós chamamos de Matrícula.
    </p>
    <Box maxW='100%' borderWidth='2px' borderRadius='5px' overflow='hidden' className={styles.boxDad}>

      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>Matrícula / Assinatura do Paciente</h1>
        </div>
      </div>

      <div className={styles.boxFormGrid}>

        <div className={styles.groupFormGrid} style={{maxWidth: '900px', width: '100%', paddingTop: '10px'}}>
        <FormLabel>Nome Paciente <span>*</span></FormLabel>
          <div>
            <select 
              name='patientName'
              placeholder='Selecione o nome do Paciente' 
              style={{width: '100%'}} 
              className={styles.selectOne}
              onChange={getFormValues}
              required
            >
            <option>Selecione o Paciente</option>
            {props.patients.map((patient, index) => (
              <option value={patient.id} key={index}>{patient.name}</option>
            ))}
            </select>
            <ButtonAddPatients text="Novo Paciente" noLink={false} isSave={false} link="/professor/cadastro/cadastrarMatriculas"/>
          </div>
        </div>

        <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
          <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Data Matrícula <span>*</span></FormLabel>
            <Input 
              name='dateMatriculation'
              type='date' 
              placeholder="Data Matrícula" 
              onChange={getFormValues}
              required
            />
          </div>
          <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Dia Vencimento <span>*</span></FormLabel>
            <Input 
              as={InputMask}
              mask='99'
              name='expiryDay'
              type='text' 
              placeholder="Dia Vencimento" 
              onChange={getFormValues}
              required
            />
          </div>
          <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Data Vencimento <span>*</span></FormLabel>
            <Input 
              name='dueDate'
              type='date' 
              placeholder="Dia Vencimento" 
              onChange={getFormValues}
              required
            />
          </div>
          <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Data 1º Pagamento</FormLabel>
            <Input 
              name='firstPaymentDay'
              type='date' 
              placeholder="Data primeiro pagamento" 
              onChange={getFormValues}
            />
          </div>
          <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Taxa de Matrícula</FormLabel>
            <Input
              as={InputMask}
              mask='9.999,99' 
              name='enrollmentFee'
              type='text' 
              placeholder="Valor Matrícula" 
              onChange={getFormValues}
            />
          </div>
        </div>

        <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
          <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Forma de Cobrança</FormLabel>
            <div>
              <select 
                name='billingMethod'
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
              >
                <option>Selecione a Forma de Cobrança</option>
                <option value='mensal'>Mensal</option>
                <option value='semetral'>Bimestral</option>
              </select>
            </div>
          </div>

          <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Valor Mensalidade <span>*</span></FormLabel>
            <Input 
              name='enrollmentValue'
              type='text' 
              placeholder="Valor Mensalidade" 
              onChange={getFormValues}
              required
            />
          </div>
        </div>

        <div className={styles.allGroupForm} style={{paddingTop: '20px'}}>
          <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Modalidade da Paciente</FormLabel>
            <div>
              <select 
                name='modality'
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
              >
                <option>Selecione a Modalidade</option>
                <option value='acunputura Laser'>ACUNPUTURA LASER</option>
                <option value='fisioterapia'>FISIOTERAPIA</option>
              </select>
            </div>
          </div>

          <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Sala de Sessão</FormLabel>
            <div>
              <select 
                name='sessionRoom'
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
              >
                <option>Selecione a Sala</option>
                <option value="sessionRoomOne">Sala 1</option>
              </select>
            </div>
          </div>

          <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Fisioterapeuta Responsável</FormLabel>
            <div>
              <select 
                name='physicalTherapist'
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
              >
                <option>Selecione o Terapeuta</option>
                <option value='Wagner Oliveira Da Cruz'>WAGNER OLIVEIRA DA CRUZ</option>
              </select>
            </div>
          </div>

          <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Plano de Matrícula</FormLabel>
            <div>
              <select 
                name='enrollmentPlan'
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
              >
                <option>Selecione o Plano</option>
                <option value='perpetuo'>Perpétuo</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
          <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Paciente com Horário Livre (Avulso)?</FormLabel>
            <div>
              <select 
                name='singleTime'
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
              >
                <option></option>
                <option value='true'>Sim</option>
                <option value='false'>Não</option>
              </select>
            </div>
          </div>
        </div>

      </div>
      
      <div className={styles.buttonsGroup}>
        <ButtonAddPatients 
          text="Salvar Matrícula" 
          noLink={true}
          disabled={isDisable ? true : false}
          onClick={addMatriculation}
        />
          <a href="/professor/cadastro/buscarMatriculas" className={styles.button}>
            <TiArrowBack className={styles.icon}/>
            Voltar
          </a>
      </div>
      
    </Box>
  </GridItem>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { ['apitFhisioToken']: token } = parseCookies(ctx);

    const userToken: IDecodToken = jwtDecode(token);
  
    const data = {
      responsibleEnterpriseUser: userToken.id
    }

    const response = await apiClient.post('/patient/find', {data});

    const patients = response.data.map(patient => {
      return {
        id: patient._id,
        name: patient.name
      }
    });

    return {
      props: {
        patients
      }
    }
  }
); 
