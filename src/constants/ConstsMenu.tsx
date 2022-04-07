import { IoIosSpeedometer } from 'react-icons/io';
import { BsFillCalendar2DateFill, BsFillCalendarCheckFill } from 'react-icons/bs';
import { HiPencilAlt } from 'react-icons/hi';
import { FaUserEdit } from 'react-icons/fa';
import { RiFolderUserLine } from 'react-icons/ri';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { BsCircle } from 'react-icons/bs';
import { AiFillSetting, AiOutlineUser } from 'react-icons/ai';

interface Items {
  title: string;
  icon: any;
  link: string;
}

interface IMenu {
  title: string;
  icon: any,
  items: Items[]
}

const ItemsMenu: IMenu[] = [
/*   {
    title: 'Sessões / Agenda',
    icon: <IoIosSpeedometer style={{fontSize: '1.5rem', margin: '0 10px'}} />,
    items: [
      {
        title: 'Calendário',
        icon: <BsFillCalendar2DateFill style={{fontSize: '1.1rem', margin: '0 10px'}} />,
        link: '/'
      },
      {
        title: 'Agenda em Lista',
        icon: <BsFillCalendar2DateFill style={{fontSize: '1.1rem', margin: '0 10px'}} />,
        link: '/'
      },
      {
        title: 'Agenda Livre',
        icon: <BsFillCalendarCheckFill style={{fontSize: '1.1rem', margin: '0 10px'}} />,
        link: '/'
      }, 
    ]
  }, */

  {
    title: 'Cadastros',
    icon: <HiPencilAlt style={{fontSize: '1.5rem', margin: '0 10px'}} />,
    items: [
      {
        title: 'Pacientes',
        icon: <FaUserEdit style={{fontSize: '1.4rem', margin: '0 10px'}} />,
        link: '/professor/cadastro/buscarPacientes'
      },
      {
        title: 'Matrículas',
        icon: <RiFolderUserLine style={{fontSize: '1.4rem', margin: '0 10px'}} />,
        link: '/professor/cadastro/buscarMatriculas'
      },
    ]
  },

/*   {
    title: 'Financeiro',
    icon: <MdOutlineAttachMoney style={{fontSize: '1.5rem', margin: '0 10px'}} />,
    items: [
      {
        title: 'Mensalidades',
        icon: <BsCircle style={{fontSize: '1.1rem', margin: '0 10px'}} />,
        link: '/'
      }, 
    ]
  }, */

  {
    title: 'Configurações',
    icon: <AiFillSetting style={{fontSize: '1.5rem', margin: '0 10px'}} />,
    items: [
      {
        title: 'Seus Dados',
        icon: <AiOutlineUser style={{fontSize: '1.1rem', margin: '0 10px'}} />,
        link: '/professor/seusDados'
      },
    ]
  },

]

export { ItemsMenu }