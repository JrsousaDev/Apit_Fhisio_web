import { GridItem } from '@chakra-ui/react';
import { withSSRAuth } from '../../../../utils/withSSRAuth';
import { GetServerSideProps } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { getAPIClient } from '../../../../service/axios';
import { jwtDecode } from '../../../../utils/jwtDecode';
import { IDecodToken } from '../../../../utils/interfaces';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/Authentication';
import { deleteOneMatriculation } from '../../../../service/matriculationApi/deleteMatriculation';
import { toast } from 'react-toastify';

import ModalDeleteMatriculation from '../../../../components/Modal/confirmDeleteMatriculation';
import ButtonAddMatriculation from '../../../../components/ButtonAdd/index';
import Table from '../../../../components/Table';
import moment from 'moment';

import styles from './styles.module.scss';

export default function MatriculationPatients(props){
  const { user } = useContext(AuthContext);
  const [ matriculationId, setMatriculationId ] = useState('');
  const [ matriculations, setMatriculations ] = useState(props.matriculations);
  const [ patientName, setPatientName ] = useState('');
  const [ patientEmail, setPatientEmail ] = useState('');
  const [ OpenModal, setOpenModal ] = useState(false);

  const toggleModal = () => {OpenModal ? setOpenModal(false) : setOpenModal(true);}

  const currentDate = moment(new Date()).format('DD/MM/YYYY');

  const deleteMatriculation = async () => {
    try {
      await deleteOneMatriculation({
        responsibleEnterpriseUser: user.id,
        emailPatient: patientEmail,
        idMatriculation: matriculationId
      });
      toast.success('Matricula excluida com sucesso!');

      const newMatriculationsList = matriculations.filter(matriculations => matriculations.id != matriculationId);
      setMatriculations(newMatriculationsList);

      toggleModal();
    } catch (err) {
      toast.warning('Internal Server Error');
    }
  }

  return(
    <GridItem rowSpan={2} colSpan={2} h="100%" className={styles.main}>

      <ModalDeleteMatriculation
        patientName={patientName} 
        OpenModal={OpenModal} 
        toggleModal={toggleModal}
        functionAction={deleteMatriculation}
      />

      <div className={styles.TitleButton}>
        <h1>Buscar Matrículas</h1>
        <ButtonAddMatriculation
          text="Nova Mátricula"
          link="/professor/cadastro/cadastrarMatriculas"
          noLink={false}
        />
      </div>

    <Table 
        title={'Lista de Matrículas'}
        data={matriculations}
        columns={[
          {title: 'Paciente', field: 'patientName.name'},
          {title: 'Fisioterapeuta', field: 'physicalTherapist'},
          {title: 'Modalidade', field: 'modality'},
          {title: 'Data Matrícula', field: 'createdAt'},
          {title: 'Data do Cadastro Paciente', field: 'patientName.createdAt'},
          {title: 'Dia vencimento', field: 'expiryDay'},
          {title: 'Valor Mensalidade', field: 'enrollmentValue'},
          {title: 'Vencimento', field: 'dueDate'},
          {title: 'Forma de Cobrança', field: 'billingMethod'},
          {
            title: 'Status', 
            field: '',
            render: rowData => <div className={
              currentDate > rowData.dueDate
              ? styles.statusTableRed
              : styles.statusTableGreen
            }>
              {currentDate > rowData.dueDate ? 'Atrasado' : 'Ativo'}
            </div>
          },
        ]}
        options={{ exportButton: true }}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Excluir Paciente',
            onClick: async (event, rowData) => {
              toggleModal();
              setPatientName(rowData.patientName.name);
              setPatientEmail(rowData.patientName.email);
              setMatriculationId(rowData.id);
            }
          }
        ]}
      />

    <div className={styles.groupInputs}>

      <div>
        <label>Total Matrículas</label>
        <input type="text" value={matriculations?.length} disabled/>
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

    const response = await apiClient.post('/matriculation/find', {data})

    const matriculations = response.data.map(matriculation => {
      return {
        id: matriculation._id,
        createdAt: moment(matriculation.createdAt).format('DD/MM/YYYY'),
        dueDate: moment(matriculation.payment.dueDate).format('DD/MM/YYYY'),
        enrollmentValue: (matriculation.payment.enrollmentValue).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
        billingMethod: matriculation.payment.billingMethod[0].toUpperCase() + matriculation.payment.billingMethod.substr(1),

        physicalTherapist: matriculation.physicalTherapist,
        expiryDay: matriculation.payment.expiryDay,
        modality: matriculation.modality[0].toUpperCase() + matriculation.modality.substr(1),

        patientName: {
          name: matriculation.patientName.name,
          email: matriculation.patientName.contact.email,
          createdAt: moment(matriculation.patientName.createdAt).format('DD/MM/YYYY'),
        }
      }
    })

    return {
      props: {
        matriculations
      }
    }
  }
); 

function toggleModal() {
  throw new Error('Function not implemented.');
}
