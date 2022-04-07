import styles from './styles.module.scss';

import { BsArrowRightSquareFill } from 'react-icons/bs'

interface CardBoardProps {
  isChurn: boolean;
  textChurn?: string;
  churns?: string;

  link?: string;

  actives: string;
  textActive: string;
  
  bgColor: string;
  color: string;
}

export default function CardBoard(props : CardBoardProps) {
  return(
    <div 
      className={styles.card} 
      style={{backgroundColor: props.bgColor, color: props.color}}
    >
      
      <div className={styles.container}>

        <div>
          <div>{props.actives}</div>
          <span>{props.textActive}</span>
        </div>

      <div style={{display: props.isChurn ? '' : 'none'}}>
          <div>{props.churns}</div>
          <span>{props.textChurn}</span>
        </div>
        

      </div>
      <a className={styles.openPage} href={props.link}>
        <span>Abrir tela</span> 
        <BsArrowRightSquareFill style={{marginLeft: '5px'}}/>
      </a>
    </div>
  )
}