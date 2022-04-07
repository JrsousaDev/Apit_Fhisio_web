import styles from './styles.module.scss';

interface ButtonProps {
  text: string;
  isLogin: boolean;
}

export function ButtonLogin(props: ButtonProps) {
  return(
    <button className={styles.button}>
      <div className={props.isLogin ? styles.buttonLogin : styles.buttonsOptions}>{props.text}</div>
    </button>
  )
}