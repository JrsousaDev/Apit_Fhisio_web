import { GridItem } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useContext, useState } from 'react';
import { withSSRAuth } from '../../../../utils/withSSRAuth';
import { deleteOnePatient } from '../../../../service/patientApi/deletePatient';
import { toast } from 'react-toastify';
import { setCookie, parseCookies } from 'nookies';
import { AuthContext } from '../../../../context/Authentication';
import { getAPIClient } from '../../../../service/axios';
import { IDecodToken, IRowData } from '../../../../utils/interfaces';
import { jwtDecode } from '../../../../utils/jwtDecode';
import { AiFillEdit } from 'react-icons/ai'

import ModalDeletePatient from '../../../../components/Modal/confirmDeletePatient';
import ButtonAddPatients from '../../../../components/ButtonAdd/index';

import Table from '../../../../components/Table';
import moment from 'moment';
import styles from './styles.module.scss';

export default function Patients(props) {
  const { user } = useContext(AuthContext);
  const [ patientName, setPatientName ] = useState('');

  const [ patientEmail, setPatientEmail ] = useState('');
  const [ patients, setPatients ] = useState(props.patients);

  const [ OpenModalDelete, setOpenModalDelete ] = useState(false);
  const toggleModalDelete = () => {setOpenModalDelete(!OpenModalDelete)}

  const deletePatient = async () => {
    try {
      await deleteOnePatient({
        responsibleEnterpriseUser: user.id,
        email: patientEmail
      });
      toast.success('Paciente excluido com sucesso!');

      const newPatientsList = patients.filter(patient => patient.email != patientEmail);
      setPatients(newPatientsList);
      
      toggleModalDelete();
    } catch (err) {
      toast.warning('Internal Server Error');
    }
  }

  return (
    <GridItem rowSpan={2} colSpan={2} h="100%" className={styles.main}>

      <ModalDeletePatient 
        patientName={patientName} 
        OpenModal={OpenModalDelete} 
        toggleModal={toggleModalDelete}
        functionAction={deletePatient}
      />

      <div className={styles.TitleButton}>
        <h1>Buscar Pacientes</h1>
        <ButtonAddPatients
          text="Novo Paciente"
          link="/professor/cadastro/cadastrarPacientes"
          noLink={false}
        />
      </div>
        
      <Table 
        title={'Lista de Pacientes'}
        columns={[
          {title: 'Paciente', field: 'name'},
          {
            title: 'Status', 
            field: 'matriculation',
            render: rowData => <div className={
              rowData.matriculation
              ? styles.statusTableGreen 
              : styles.statusTableRed
            }>
              {rowData.matriculation ? 'Matriculado' : 'Não Matriculado'}
            </div>
          
          },
          {title: 'Email', field: 'email'},
          {title: 'Celular', field: 'phone'},
          {title: 'CPF', field: 'cpf'},
          {title: 'Data Nasc.', field: 'birthDate'}
        ]}
        data={patients}
        actions={[
          {
            icon: () => <a href='/professor/cadastro/editarPaciente'><AiFillEdit /></a>,
            tooltip: 'Editar Paciente',
            onClick: (event, rowData) => {
              setCookie(undefined, 'apitFhisio_p_slct', rowData.id, {
                maxAge: 60 * 1
              });
            } 
          },
          {
            icon: 'delete',
            tooltip: 'Excluir Paciente',
            onClick: async (event, rowData: IRowData) => {
              toggleModalDelete();
              setPatientName(rowData.name);
              setPatientEmail(rowData.email);
            }
          },
        ]}
      />

    <div className={styles.groupInputs}>
      <div>
        <label>Total Pacientes</label>
        <input type="text" value={patients?.length} disabled/>
      </div>
    </div>

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
        name: patient.name,
        password: patient.password,
        gender: patient.gender,
        cpf: patient.cpf,

        birthDate: moment(patient.birthDate).format('DD/MM/YYYY'),

        //Contact
        email: patient.contact.email,
        phone: patient.contact.phone,
        telephone: patient.contact.telephone,

        //Address
        cityAndState: patient.address.cityAndState,
        street: patient.address.street,
        numberAndComplement: patient.address.numberAndComplement,
        addressName: patient.address.addressName,
        cep: patient.address.cep,

        //PatientOpciones
        responsibleEnterpriseUser: patient.patientOpciones.responsibleEnterpriseUser,
        customerPortal: patient.patientOpciones.customerPortal,
        profession: patient.patientOpciones.profession,
        heKnew: patient.patientOpciones.heKnew,

        matriculation: patient.matriculation || null,
      }
    });

    return {
      props: {
        patients
      }
    }
  }
); 
