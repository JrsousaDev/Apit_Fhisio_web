import jwt_decode from 'jwt-decode';

export function jwtDecode(token: any) {
  let decoded = jwt_decode(token);
  return decoded;
}