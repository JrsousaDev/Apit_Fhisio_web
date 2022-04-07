import { useContext, useState } from 'react';
import { GridItem } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { IoMdHelpCircle } from 'react-icons/io';
import { GoTriangleDown } from 'react-icons/go';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MenuContext } from '../../context/MenuContext';
import { FiSearch } from 'react-icons/fi';
import { AuthContext } from '../../context/Authentication';

import styles from './styles.module.scss';

export default function Header() {
  const { toggleOpenMenu } = useContext(MenuContext);
  const { user, logout } = useContext(AuthContext);

  const [ openModalPassword, setOpenModalPassword ] = useState(false);

  function openAndCloseModalPassword(){
    setOpenModalPassword(!openModalPassword)
  }

  return(
  <>

    <GridItem rowSpan={1} colSpan={2} className={styles.header}>

      <div className={styles.containerList}>
      <div>
        <div><GiHamburgerMenu style={{fontSize: '19px'}} onClick={toggleOpenMenu}/></div>
        <div>Agenda</div>
        <div style={{position: 'relative'}}>
          <input type="search" placeholder="Pesquisar Aluno/Paciente"/>
          <FiSearch className={styles.iconSearch}/>
        </div>
      </div>

      <div onClick={openAndCloseModalPassword}>
        <div><IoMdHelpCircle className={styles.icons}/> Ajuda
          <GoTriangleDown className={styles.angle}/>
        </div>
        <div onClick={logout}>
          <FaUser className={styles.icons}/> 
          {user?.name} 
          <GoTriangleDown className={styles.angle}/>
        </div>
      </div>
      </div>
    </GridItem>
  </>
  )
}