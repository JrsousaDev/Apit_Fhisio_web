import { parseCookies } from 'nookies';
import axios from 'axios';

export function getAPIClient(ctx: any) {  
  const { 'apitFhisioToken': token } = parseCookies(ctx);
  
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND
  });
  
  if (token) {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
  }

  return api;
}

