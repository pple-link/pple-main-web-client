import { customAxios } from '../lib/customAxios';

export const getAccountProfile = (jwt: string) => {
  return customAxios.get('/api/v1/account/profile', {
    headers: { 'X-AUTH-TOKEN': jwt },
  });
};
