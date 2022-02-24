import { useNavigate } from 'react-router-dom';
import SignUp from '../interface/SignUp';
import { customAxios } from '../lib/customAxios';

const navigate = useNavigate();

export const getAccountProfile = (jwt: string) => {
  return customAxios.get('/api/v1/account/profile', {
    headers: { 'X-AUTH-TOKEN': jwt },
  });
};

export const postSignUpBody = (body: SignUp, jwt: string) => {
  return customAxios
    .patch('/api/v1/account', body, {
      headers: { 'X-AUTH-TOKEN': `${jwt}` },
    })
    .then(() => {
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      console.log('patch Sign Up Error');
    });
};
