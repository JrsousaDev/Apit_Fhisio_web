import { AppProps } from 'next/app';
import { MainProvider } from '../context/MainProvider';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
      <MainProvider>
        <Component {...pageProps} className="stylesBody"/>
      </MainProvider>
  )
}

export default MyApp;
