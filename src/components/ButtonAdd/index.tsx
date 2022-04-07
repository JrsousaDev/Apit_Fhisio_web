import { IoIosAddCircle } from 'react-icons/io';
import { ButtonHTMLAttributes } from 'react';
import { FaSave } from 'react-icons/fa';

import styles from './styles.module.scss';
import Router from 'next/router';

interface IButtonAddProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  text: string;
  link?: string;
  isSave?: boolean;
  noLink: boolean;
}

export default function ButtonAdd({ text, link, isSave, noLink, ...rest }: IButtonAddProps) {
  return(
  <>
    {link &&
      <button className={styles.button} {...rest}>
        <a href={link}>
          <IoIosAddCircle className={styles.icon}/>
          {text}
        </a>
      </button>
    }
    {noLink &&
      <button className={styles.button} {...rest}>
        <IoIosAddCircle className={styles.icon}/>
        {text}
      </button>
    }
    {isSave &&
    <button className={styles.button} {...rest}>
      <FaSave className={styles.icon}/>
      {text}
    </button>
    }
  </>
  )
}