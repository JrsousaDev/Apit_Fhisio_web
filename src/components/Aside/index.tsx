import { GridItem } from '@chakra-ui/react';
import { GrReactjs } from 'react-icons/gr';
import { FaAngleRight } from 'react-icons/fa';
import { MouseEvent, useContext } from 'react';
import { ItemsMenu } from '../../constants/ConstsMenu';
import { MenuContext } from '../../context/MenuContext';

import $ from 'jquery';

import styles from './styles.module.scss';

export default function Aside() {
  const { responsiveMenu, hoverOpenMenu } = useContext(MenuContext);
  
  function openSubMenus(e: MouseEvent) {
    $(e.target).next(".subMenuOpen").slideToggle();
    $(e.target).find(".activeRotate").toggleClass(`${styles.rotate}`);
  }

  return(
  <GridItem 
    rowSpan={4} 
    colSpan={1} 
    h="100%"
    className={`${responsiveMenu ? styles.asideTwo : styles.aside }`}
    onClick={hoverOpenMenu}
  >

    <div className={styles.asideHeader}>
      <a href="/professor/dashboard">
        <div className={styles.asideLogo}>
          <GrReactjs className={styles.logo}/> 
        </div>
      </a>

      {responsiveMenu &&
        <></>
      }
      {!responsiveMenu &&
        <span>Clínica Wagner Cruz</span>
      }
    </div>
    
    <hr />

  {ItemsMenu.map((item, index) => (
  <div className={styles.item} onClick={openSubMenus} key={index}>

      {responsiveMenu &&
      <a>
        {item.icon}
      </a>
      }
      {!responsiveMenu &&
      <a>
        {item.icon} {item.title}
        <i className={`${styles.angle} activeRotate`}>
        <FaAngleRight />
        </i>
      </a>
      }

    {!responsiveMenu &&
      <div className={`${styles.subMenu} subMenuOpen`}>
        {item.items.map((subItem, index) => (
          <a href={subItem.link} key={index}>
            {subItem.icon}
            {subItem.title}
          </a>
        ))}
      </div>
    }

  </div>
  ))}

  </GridItem>
  )
}