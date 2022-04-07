import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies['apitFhisioToken'];
    const editPatient = cookies['apitFhisio_p_slct'];

    if (editPatient) {
      destroyCookie(context, 'apitFhisio_p_slct');
    }
  
    if (!token) {
      return {
        redirect: {
          destination: '/professor/login',
          permanent: false,
        }
      }
    }

    return await fn(context);
  }
}