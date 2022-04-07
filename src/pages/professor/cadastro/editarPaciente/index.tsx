import {
  Box, GridItem, FormLabel, Input, Text,Textarea
} from '@chakra-ui/react'
import { withSSRAuth } from '../../../../utils/withSSRAuth';
import { GetServerSideProps } from 'next';
import { useContext, useState } from 'react';
import { updatePatient } from '../../../../service/patientApi/updatePatient';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/Authentication';
import { TiArrowBack } from 'react-icons/ti';
import { parseCookies } from 'nookies';
import { getAPIClient } from '../../../../service/axios';
import { IDecodToken } from '../../../../utils/interfaces';
import { DiDatabase } from 'react-icons/di';
import { HiOutlineBookOpen } from 'react-icons/hi';

import InputMask from 'react-input-mask';
import ButtonAddPatients from '../../../../components/ButtonAdd/index';

import styles from './styles.module.scss';
import jwtDecode from 'jwt-decode';

export default function EditPatient(props) {
  const { user } = useContext(AuthContext);
  const [ formValues, setFormValues ] = useState({});
  const [ isDisable, setIsDisable ] = useState(false);
  const [ abaSelected, setAbaSelected ] = useState(1);

  const getFormValues = (value: any) => {
    setIsDisable(false)
    setFormValues((oldValues) => (
      {
        ...oldValues,
        [value.target.name]: value.target.value,
        id: user.id,
        defaultPatientEmail: props.patient.email,
        defaultPatientId: props.patient.id,
      }
    ));
  }

  const editPatient = async () => {

    try {
      await updatePatient(formValues);
      toast.success('Paciente atualizado com sucesso!');
    } catch (err) {
      toast.warn('Por favor, preencha todos os campos ou EMAIL já é existente!');
    }

  }

  return(
  <GridItem rowSpan={2} colSpan={2} h="100%" className={styles.main}>

    <h1 className={styles.pagTitle}>Editar <span>Paciente</span></h1>

      <h1>{props.patient.name}</h1>
      <h2>Idade: {props.patient.birthDate}</h2>

    <Box maxW='100%' borderWidth='2px' borderRadius='5px' overflow='hidden' className={styles.boxDad}>

      <div className={styles.titleContainer}>

        <div 
          className={`${styles.title} ${abaSelected === 1 && styles.selected}`}
          onClick={() => setAbaSelected(1)}
        >
          <DiDatabase className={styles.icon}/> 
          <h1>Dados</h1>
        </div>

        <div 
          className={`${styles.title} ${abaSelected === 2 && styles.selected}`}
          onClick={() => setAbaSelected(2)}
        >
          <HiOutlineBookOpen className={styles.icon}/> 
          <h1>Matrícula</h1>
        </div>

      </div>

      {abaSelected === 1 &&
      <Box className={styles.boxChild} borderWidth='1px' borderRadius="3px">

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '900px', width: '100%'}}>
            <FormLabel>Nome do Paciente <span>*</span></FormLabel>
            <Input 
              name='patientName'
              type='text' 
              placeholder="Nome do Paciente" 
              onChange={getFormValues}
              defaultValue={props.patient.name}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Data Nascimento</FormLabel>
            <Input 
              name='patientBirthDate'
              type='date' 
              placeholder="Data de Nascimento" 
              onChange={getFormValues}
              defaultValue={props.patient.birthDate}
            />
        </div>
        <div style={{maxWidth: '150px', width: '100%'}}>
            <FormLabel>Sexo</FormLabel>
            <div>
              <select 
                name="patientGender"
                placeholder='Sexo' 
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
                defaultValue={props.patient.gender}
              >
                <option>-----</option>
                <option value='M'>Masculino</option>
                <option value='F'>Feminino</option>
              </select>
            </div>
        </div>
        <div style={{maxWidth: '400px', width: '100%'}}>
            <FormLabel>Nome Responsável</FormLabel>
            <Input 
              name='patientResponsibleName'
              type='text' 
              placeholder="Nome do Responsável" 
              onChange={getFormValues}
              defaultValue={props.patient.responsibleName}
            />
        </div>
        <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>CPF</FormLabel>
            <Input
              as={InputMask}
              mask='999.999.999-99' 
              name='cpf'
              type='text' 
              placeholder="CPF" 
              onChange={getFormValues}
              defaultValue={props.patient.cpf}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
      <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Acesso ao portal do Paciente?</FormLabel>
            <div>
              <select 
                name='patientCustomerPortal'
                placeholder='Acesso ao portal do paciente?' 
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
                defaultValue={props.patient.customerPortal}
              >
                <option>----</option>
                <option value='false'>Não</option>
                <option value='true'>Sim</option>
              </select>
            </div>
        </div>
        <div style={{maxWidth: '400px', width: '100%'}}>
            <FormLabel>Email</FormLabel>
            <Input 
              name='patientEmail'
              type='text' 
              placeholder="E-mail" 
              onChange={getFormValues}
              defaultValue={props.patient.email}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '700px', width: '100%'}}>
            <FormLabel>Endereço (Rua, Avenida...)</FormLabel>
            <Input 
              name='patientAddressName'
              type='text' 
              placeholder="Endereço" 
              onChange={getFormValues}
              defaultValue={props.patient.addressName}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Número + Complemento</FormLabel>
            <Input 
              name='patientNumberAndComplement'
              type='text' 
              placeholder="Número/Complemento" 
              onChange={getFormValues}
              defaultValue={props.patient.numberAndComplement}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '700px', width: '100%'}}>
            <FormLabel>Bairro</FormLabel>
            <Input 
              name='patientStreet'
              type='text' 
              placeholder="Bairro" 
              onChange={getFormValues}
              defaultValue={props.patient.street}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Cidade/UF</FormLabel>
            <Input 
              name='patientCityAndState'
              type='text'
              placeholder="Cidade/UF" 
              onChange={getFormValues}
              defaultValue={props.patient.cityAndState}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>CEP</FormLabel>
            <Input
              as={InputMask}
              mask='99999-999' 
              name='patientCep'
              type='text' 
              placeholder="CEP" 
              onChange={getFormValues}
              defaultValue={props.patient.cep}
            />
        </div>

        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Atual Senha</FormLabel>
            <Input 
              name='password'
              type='text' 
              placeholder="Senha" 
              onChange={getFormValues}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Celular <span>*</span></FormLabel>
            <Input
              as={InputMask}
              mask='(99) 9 9999-9999' 
              name='patientPhone'
              type='text' 
              placeholder="(DDD) Celular" 
              onChange={getFormValues}
              defaultValue={props.patient.phone}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Telefone</FormLabel>
            <Input
              as={InputMask}
              mask='(99) 9999-9999' 
              name='patientTelephone'
              type='text' 
              placeholder="(DDD) Telefone" 
              onChange={getFormValues}
              defaultValue={props.patient.telephone}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '500px', width: '100%'}}>
            <FormLabel>Profissão/Ocupação</FormLabel>
            <Input 
              name='patientProfession'
              type='text' 
              placeholder="Profissão/Ocupação" 
              onChange={getFormValues}
              defaultValue={props.patient.profession}
            />
        </div>
        <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Como conheceu?</FormLabel>
            <div>
              <select 
                name='patientHeKnew'
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
                defaultValue={props.patient.heKnew}
              >
                <option>---</option>
                <option value='google'>Google</option>
                <option value='facebook'>Facebook</option>
                <option value='instagram'>Instagram</option>
                <option value='recommendation'>Indicação de amigos</option>
                <option value='others'>Outros</option>
              </select>
            </div>
        </div>
        <div style={{maxWidth: '100%', width: '100%'}}>
          <Text mb='8px'>Observação <span>(Informações)</span></Text>
          <Textarea 
            name='patientObservation'
            placeholder='Informação Extra ao Cadastro do Aluno'
            onChange={getFormValues}
          />
        </div>
      </div>
      
      <div className={styles.buttonsGroup}>
        <ButtonAddPatients 
          text="Salvar Cadastro" 
          onClick={editPatient}
          noLink={true} 
          disabled={isDisable ? true : false}
        />
          <a href="/professor/cadastro/buscarPacientes" className={styles.button}>
            <TiArrowBack className={styles.icon}/>
            Voltar
          </a>
      </div>
      </Box>
      }
      {abaSelected === 2 &&
        <>
          oi
        </>
      }

    </Box>
  </GridItem>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = getAPIClient(ctx);

    const { 
      ['apitFhisioToken']: token, 
      ['apitFhisio_p_slct']: idPatient
    } = parseCookies(ctx);

    if (!idPatient) {
      return{
        redirect:{
          destination: '/professor/cadastro/buscarPacientes',
          permanent: false,
        }
      }
    }

    const userToken: IDecodToken = jwtDecode(token);

    const data = {
      responsibleEnterpriseUser: userToken.id,
      idPatient,
    }

    const response = await apiClient.post('/patient/findOne', {data});

    const patient = {
      id: response.data._id,
      name: response.data.name || null,
      birthDate: response.data.birthDate.replace('T00:00:00.000Z', '') || null,
      gender: response.data.gender || null,
      cpf: response.data.cpf || null,
      email: response.data.contact.email || null,
      phone: response.data.contact.phone || null,
      telephone: response.data.contact.telephone || null,
      cityAndState: response.data.address.cityAndState || null,
      street: response.data.address.street || null,
      numberAndComplement: response.data.address.numberAndComplement || null,
      addressName: response.data.address.addressName || null,
      cep: response.data.address.cep || null,
      profession: response.data.patientOpciones.profession || null,
      observation: response.data.patientOpciones.observation || null,
      customerPortal: response.data.patientOpciones.customerPortal,
      heKnew: response.data.patientOpciones.heKnew || null,
      responsibleName: response.data.patientOpciones.responsibleName || null,
    }

    return {
      props: {
        patient
      }
    }
  }
); 