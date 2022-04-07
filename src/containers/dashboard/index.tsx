import { Grid } from '@chakra-ui/react';
import { ReactElement } from 'react';

import Aside from '../../components/Aside';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

interface IContainerDashboardProps {
  children: ReactElement;
  responsiveMenu: boolean;
}

export default function containerDashboard(props: IContainerDashboardProps) {
  return( 
  <Grid
    h='100vh'
    templateRows='60px 100%'
    templateColumns={props.responsiveMenu ?  '80px 5fr 1fr' : '250px 5fr 1fr'}
    justifyContent='center'
    gap={0}
  >
    <Aside />
    <Header />
      {props.children}
    <Footer />
  </Grid>
  )
}