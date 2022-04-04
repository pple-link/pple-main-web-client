import SignUp from '../interface/SignUp';
import { customAxios } from '../customAxios';
import { AxiosError } from 'axios';

export const getAccountProfile = (jwt: string) => {
  return customAxios.get('/api/v1/account/profile', {
    headers: { 'X-AUTH-TOKEN': jwt },
  });
};

export const returnReissue = (accessToken: string, refreshToken: string) => {
  const body = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  console.log(`returnReissue : ${body.accessToken} \n ${body.refreshToken}`);
  return customAxios
    .post('/reissue', body, {
      headers: {
        'X-AUTH-TOKEN': refreshToken,
      },
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      const error = err as AxiosError;
      console.log(error);
    });
};

export const postSignUpBody = (body: SignUp, jwt: string) => {
  return customAxios.patch('/api/v1/account', body, {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};

export const patchUserDisplayName = (
  uuid: string,
  jwt: string,
  displayName: string,
  profileImageFile: File,
) => {
  const body = {
    displayName: displayName,
  };
  // const formData = new FormData();
  // formData.append('displayName', displayName);
  // formData.append('file', profileImageFile);
  return customAxios.patch(`/api/v1/account/displayName/${uuid}`, body, {
    headers: {
      'X-AUTH-TOKEN': `${jwt}`,
      'Media-Types': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};
