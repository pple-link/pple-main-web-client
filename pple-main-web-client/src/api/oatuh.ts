import { customAxios } from '../lib/customAxios';

export const getKakaoRedirectURL = (code: string) => {
  return customAxios.get(`/auth/kakao/callback?code=${code}`).catch(err => {
    console.log(err);
  });
};
