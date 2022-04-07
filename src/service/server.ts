import { parseCookies } from 'nookies';
import axios from 'axios';

const { 'apitFhisioToken': token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND
});

if (token) {
  api.defaults.headers['authorization'] = `Bearer ${token}`;
}
