import {
  Box, GridItem, FormLabel, Input, Select,Grid,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { withSSRAuth } from '../../../utils/withSSRAuth';
import { GetServerSideProps } from 'next';
import { Countrys } from '../../../constants/ConstsCountry';
import { States } from '../../../constants/ConstsState';
import { updateEnterprise } from '../../../service/enterpriseApi/updateEnterprise';
import { toast } from 'react-toastify';
import { updateUser } from '../../../service/usersApi/updateUser';
import { createEnteprise } from '../../../service/enterpriseApi/createEnterprise';
import { parseCookies } from 'nookies';
import { AuthContext } from '../../../context/Authentication';
import { getAPIClient } from '../../../service/axios';
import { jwtDecode } from '../../../utils/jwtDecode';
import { IDecodToken } from '../../../utils/interfaces';

import InputMask from 'react-input-mask';
import ButtonSaveAlteracions from '../../../components/ButtonAdd/index';

import styles from './styles.module.scss';

export default function youData(props) {
  const { user } = useContext(AuthContext);
  const [ formValues, setFormValues ] = useState({});
  const [ isDisable, setIsDisable ] = useState(true);

  const getFormValues = (value: any) => {
    setIsDisable(false)
    setFormValues((oldValues) => (
      {
        ...oldValues,
        [value.target.name]: value.target.value,
        id: user.id,
        defaultEnterpriseId: props.user?.enterprise?.id,
        defaultUserEmail: props.user?.email,
        defaultEnterpriseEmail: props.user?.enterprise?.email,
        defaultEnterpriseCNPJ: props.user?.enterprise?.cnpj
      }
    ))
  }

  const updateInformations = async () => {

    if (!props.user?.enterprise?.cnpj) {

      try {
        await updateUser(formValues);
        await createEnteprise(formValues);
        toast.success('Alterações salvas com sucesso!');
      } catch (err) {
        toast.warn('Por favor, preencha todos os campos ou CNPJ já é existente!');
      }

    } else {

      try{
        await updateUser(formValues);
        await updateEnterprise(formValues);
        toast.success('Alterações salvas com sucesso!');
      }catch(err){
        toast.warn('Por favor, preencha todos os campos ou CNPJ já é existente!');
      }
    }
  }

  return(
    <GridItem rowSpan={2} colSpan={2} h="100%" className={styles.main}>

    <h1 className={styles.pagTitle}>Seus <span>Dados</span></h1>

    <Box maxW='100%' borderWidth='2px' borderRadius='5px' overflow='hidden' className={styles.boxDad}>

    <div className={styles.titleContainer}>
        <div className={styles.title}>
          <h1>Seus Dados Pessoais e da Empresa</h1>
        </div>
    </div>

      <Box className={styles.boxChild} borderWidth='1px' borderRadius="3px">
        
      <div className={styles.titleContainerChild}>
        <div className={styles.titleChild}>
          <h1>Dados da Empresa</h1>
        </div>
      </div>

      <div className={styles.formBox}>
        <Grid
          templateColumns='repeat(6, 1fr)'
          gap={4}
        >
          <GridItem colSpan={3}>
            <FormLabel>Nome Estúdio/Empresa <span>*</span></FormLabel>
            <Input 
              name='enterpriseName'
              type='text' 
              placeholder="Nome Empresa" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.name}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <FormLabel>CNPJ <span>*</span></FormLabel>
            <Input
              as={InputMask}
              mask='99.999.999/9999-99'
              name='enterpriseCNPJ'
              type='text' 
              placeholder="CNPJ"
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.cnpj}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <FormLabel>Insc. Municipal <span>*</span></FormLabel>
            <Input 
              as={InputMask}
              mask='999999-9'
              name='enterpriseRegMunicipal'
              type='text' 
              placeholder="Inscrição Municipal" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.regMunicipal}
            />
          </GridItem>
          
          <GridItem colSpan={3}>
            <FormLabel>Email da Empresa <span>*</span></FormLabel>
            <Input 
              name='enterpriseEmail'
              type='email' 
              placeholder="Email da Empresa" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.email}
            />
          </GridItem>

          <GridItem colSpan={1}>
            <FormLabel>Celular da Empresa <span>*</span></FormLabel>
            <Input 
              as={InputMask}
              mask="(99) 9 9999-9999"
              name='enterprisePhone'
              type='text' 
              placeholder="(DDD) 0 0000-0000" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.phone}
            />
          </GridItem>

          <GridItem colSpan={1}>
          <FormLabel>País</FormLabel>
          <Select 
            name='enterpriseCountry' 
            onChange={getFormValues}
          >
            <option></option>
            {Countrys.map((country, index) => (
              <option 
                value={country.value} 
                key={index}
                selected={props.user?.enterprise?.address.country === country.value ? true : false}
              >
                {country.name}
              </option>
            ))}
          </Select>
          </GridItem>
          
          <GridItem colSpan={3}>
            <FormLabel>Nome Responsável</FormLabel>
            <Input 
              name='enterpriseResponsibleName'
              type='email' 
              placeholder="Nome Responsável" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.responsibleName}
            />
          </GridItem>

          <GridItem colSpan={3}>
          <FormLabel>Endereço <span>*</span></FormLabel>
            <Input 
              name='enterpriseAddressName'
              type='text' 
              placeholder="Endereço" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.address.addressName}
            />
          </GridItem>

          <GridItem colSpan={2}>
          <FormLabel>Número <span>*</span></FormLabel>
            <Input 
              name='enterpriseAddressNumber'
              type='text' 
              placeholder="Número" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.address.number}
            />
          </GridItem>

          <GridItem colSpan={1}>
          <FormLabel>CEP <span>*</span></FormLabel>
            <Input
              as={InputMask}
              mask='99999-999'
              name='enterpriseCep'
              type='text' 
              placeholder="CEP"
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.address.cep}
            />
          </GridItem>

          <GridItem colSpan={3}>
          <FormLabel>Bairro <span>*</span></FormLabel>
            <Input 
              name='enterpriseStreet'
              type='text' 
              placeholder="Bairro" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.address.street}
            />
          </GridItem>

          <GridItem colSpan={1}>
          <FormLabel>Cidade <span>*</span></FormLabel>
            <Input 
              name='enterpriseCity'
              type='text' 
              placeholder="Cidade" 
              onChange={getFormValues}
              defaultValue={props.user?.enterprise?.address.city}
            />
          </GridItem>

          <GridItem colSpan={1}>
          <FormLabel>Estado <span>*</span></FormLabel>
          <Select 
            name='enterpriseState' 
            onChange={getFormValues}
          >
            <option></option>
            {States.map((state, index) => (
              <option 
                value={state.value}
                key={index} 
                selected={props.user?.enterprise?.address.state === state.value ? true : false}>
                  {state.name}
              </option>
            ))}
          </Select>
          </GridItem>
          
        </Grid>
      </div>
    </Box>
    <Box style={{marginTop: '20px'}} borderWidth='1px' className={styles.boxChildTwo}>
        <div className={styles.titleContainerChildTwo}>
          <div className={styles.titleChild}>
            <h1>Dados da Pessoais</h1>
          </div>
        </div>

        <div className={styles.formBox}>
          <Grid
            templateColumns='repeat(6, 1fr)'
            gap={4}
          >
            <GridItem colSpan={5}>
              <FormLabel>Seu Nome <span>*</span></FormLabel>
              <Input 
                name='userName'
                type='text' 
                placeholder="Seu Nome" 
                defaultValue={props.user?.name}
                onChange={getFormValues}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <FormLabel>CPF</FormLabel>
              <Input
                as={InputMask}
                mask="999.999.999-99" 
                name='userCPF'
                type='text' 
                id="cpf"
                placeholder="CPF" 
                defaultValue={props.user?.cpf}
                onChange={getFormValues}
              />
            </GridItem>

            <GridItem colSpan={3}>
              <FormLabel>Email</FormLabel>
              <Input 
                name='userEmail'
                type='email' 
                placeholder="E-mail" 
                defaultValue={props.user?.email}
                onChange={getFormValues}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <FormLabel>Celular <span>*</span></FormLabel>
              <Input
                as={InputMask}
                mask="(99) 9 9999-9999"
                name='userPhone'
                type='email' 
                placeholder="(DDD) 0 0000-0000" 
                defaultValue={props.user?.phone}
                onChange={getFormValues}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <FormLabel>Telefone</FormLabel>
              <Input
                as={InputMask}
                mask="(99) 9999-9999"
                name='userTelephone'
                type='email' 
                placeholder="(DDD) 0000-0000" 
                defaultValue={props.user?.telephone}
                onChange={getFormValues}
              />
            </GridItem>

          </Grid>

        <div className={styles.buttonsGroup}>
          <ButtonSaveAlteracions 
            text="Salvar Alterações" 
            noLink={false} 
            isSave={true} 
            onClick={updateInformations}
            disabled={isDisable ? true : false}
          />
            <a href="/professor/dashboard" className={styles.button}>
              Voltar
            </a>
        </div>

        </div>
    </Box>
  </Box>
  </GridItem>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = getAPIClient(ctx);
    const { ['apitFhisioToken']: token } = parseCookies(ctx);

    const userToken: IDecodToken = jwtDecode(token);

    const response = await apiClient.post('/user/find', {id: userToken.id});

      const user = {
        name: response.data.name || null,
        cpf: response.data.cpf ||null,
        email: response.data.contact?.email ||null,
        telephone: response.data.contact?.telephone ||null,
        phone: response.data.contact?.phone || null,
  
        enterprise: {
          id: response.data.enterprise?._id || null,
          responsibleName: response.data.enterprise?.responsibleName || null,
          name: response.data.enterprise?.name || null,
          cnpj: response.data.enterprise?.cnpj || null,
          email: response.data.enterprise?.contact.email || null,
          phone: response.data.enterprise?.contact.phone || null,
          regMunicipal: response.data.enterprise?.regMunicipal || null,
          address: {
            state: response.data.enterprise?.address.state || null,
            city: response.data.enterprise?.address.city || null,
            cep: response.data.enterprise?.address.cep || null,
            country: response.data.enterprise?.address.country || null,
            street: response.data.enterprise?.address.street || null,
            addressName: response.data.enterprise?.address.addressName || null,
            number: response.data.enterprise?.address.number || null
          }
        }
      }
    

    return {
      props: {
        user
      }
    }
  }
); 
