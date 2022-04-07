import { GridItem } from '@chakra-ui/react';

import styles from './styles.module.scss';

export default function Footer() {
  return(
    <GridItem colSpan={2} className={styles.footer}>
      <div className={styles.containerList}>

      <div>
        <div>2022 Software (Junior Sousa).</div>
        CNPJ: 22.209.102/0001-60 / Aracaju - SE / Brasil.
      </div>

      <div>
        <strong>Versão</strong>
        2.1.0.8450
      </div>

      </div>
    </GridItem>
  )
}