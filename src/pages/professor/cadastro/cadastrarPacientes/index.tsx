import {
  Box, GridItem, FormLabel, Input, Text,Textarea
} from '@chakra-ui/react'
import { withSSRAuth } from '../../../../utils/withSSRAuth';
import { GetServerSideProps } from 'next';
import { IoMdPersonAdd } from 'react-icons/io';
import { useContext, useState } from 'react';
import { createPatient } from '../../../../service/patientApi/createPatient';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/Authentication';
import { TiArrowBack } from 'react-icons/ti';

import InputMask from 'react-input-mask';
import ButtonAddPatients from '../../../../components/ButtonAdd/index';

import styles from './styles.module.scss';

export default function RegisterPatients() {
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

  const addPatient = async () => {

    try {
      await createPatient(formValues);
      toast.success('Paciente cadastrado com sucesso!');
    } catch (err) {
      toast.warn('Por favor, preencha todos os campos ou EMAIL já é existente!');
    }

  }

  return(
  <GridItem rowSpan={2} colSpan={2} h="100%" className={styles.main}>

    <h1 className={styles.pagTitle}>Inserir <span>Pacientes</span></h1>

    <Box maxW='100%' borderWidth='2px' borderRadius='5px' overflow='hidden' className={styles.boxDad}>

      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <IoMdPersonAdd className={styles.icon}/> 
          <h1>Cadastro</h1>
        </div>
      </div>

      <Box className={styles.boxChild} borderWidth='1px' borderRadius="3px">

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '900px', width: '100%'}}>
            <FormLabel>Nome do Paciente <span>*</span></FormLabel>
            <Input 
              name='name'
              type='text' 
              placeholder="Nome do Paciente" 
              onChange={getFormValues}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Data Nascimento</FormLabel>
            <Input 
              name='birthDate'
              type='date' 
              placeholder="Data de Nascimento" 
              onChange={getFormValues}
            />
        </div>
        <div style={{maxWidth: '150px', width: '100%'}}>
            <FormLabel>Sexo</FormLabel>
            <div>
              <select 
                name="gender"
                placeholder='Sexo' 
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
              >
                <option>-----</option>
                <option value='male'>Masculino</option>
                <option value='female'>Feminino</option>
              </select>
            </div>
        </div>
        <div style={{maxWidth: '400px', width: '100%'}}>
            <FormLabel>Nome Responsável</FormLabel>
            <Input 
              name='responsibleName'
              type='text' 
              placeholder="Nome do Responsável" 
              onChange={getFormValues}
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
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
      <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Acesso ao portal do Paciente?</FormLabel>
            <div>
              <select 
                name='customerPortal'
                placeholder='Acesso ao portal do paciente?' 
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
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
              name='email'
              type='text' 
              placeholder="E-mail" 
              onChange={getFormValues}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '700px', width: '100%'}}>
            <FormLabel>Endereço (Rua, Avenida...)</FormLabel>
            <Input 
              name='addressName'
              type='text' 
              placeholder="Endereço" 
              onChange={getFormValues}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Número + Complemento</FormLabel>
            <Input 
              name='numberAndComplement'
              type='text' 
              placeholder="Número/Complemento" 
              onChange={getFormValues}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '700px', width: '100%'}}>
            <FormLabel>Bairro</FormLabel>
            <Input 
              name='street'
              type='text' 
              placeholder="Bairro" 
              onChange={getFormValues}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Cidade/UF</FormLabel>
            <Input 
              name='cityAndState'
              type='text'
              placeholder="Cidade/UF" 
              onChange={getFormValues}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>CEP</FormLabel>
            <Input
              as={InputMask}
              mask='99999-999' 
              name='cep'
              type='text' 
              placeholder="CEP" 
              onChange={getFormValues}
            />
        </div>

        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Senha</FormLabel>
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
              name='phone'
              type='text' 
              placeholder="(DDD) Celular" 
              onChange={getFormValues}
            />
        </div>
        <div style={{maxWidth: '300px', width: '100%'}}>
            <FormLabel>Telefone</FormLabel>
            <Input
              as={InputMask}
              mask='(99) 9999-9999' 
              name='telephone'
              type='text' 
              placeholder="(DDD) Telefone" 
              onChange={getFormValues}
            />
        </div>
      </div>

      <div className={styles.allGroupForm} style={{paddingTop: '10px'}}>
        <div style={{maxWidth: '500px', width: '100%'}}>
            <FormLabel>Profissão/Ocupação</FormLabel>
            <Input 
              name='profession'
              type='text' 
              placeholder="Profissão/Ocupação" 
              onChange={getFormValues}
            />
        </div>
        <div style={{maxWidth: '200px', width: '100%'}}>
            <FormLabel>Como conheceu?</FormLabel>
            <div>
              <select 
                name='heKnew'
                placeholder='Aviso de Aniversário' 
                style={{width: '100%'}} 
                className={styles.selectTwo}
                onChange={getFormValues}
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
            name='observation'
            placeholder='Informaçã Extra ao Cadastro do Aluno'
            onChange={getFormValues}
          />
        </div>
      </div>
      
      <div className={styles.buttonsGroup}>
        <ButtonAddPatients 
          text="Salvar Cadastro" 
          onClick={addPatient}
          noLink={true} 
          disabled={isDisable ? true : false}
        />
          <a href="/professor/cadastro/buscarPacientes" className={styles.button}>
            <TiArrowBack className={styles.icon}/>
            Voltar
          </a>
      </div>
      </Box>
    </Box>
  </GridItem>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {

    return {
      props: {}
    }
  }
); 