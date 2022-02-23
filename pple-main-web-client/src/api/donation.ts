import { customAxios } from '../lib/customAxios';

export const updateDonation = (donationUuid: string, parameter: any) => {
  return customAxios.patch(`/api/v1/donation/${donationUuid}`, {
    parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
};

export const getOwnDonations = (jwt: string) => {
  return customAxios.get('/api/v1/donation/own', {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};

export const getExpiredDonations = () => {
  return customAxios.get('/api/v1/account/donation/gus5427@naver.com/test');
};

export const updateExpiredDonation = (donationUuid: string) => {
  return customAxios
    .post(`/api/v1/account/donation/renew/${donationUuid}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      console.log('Updating Donation is failed');
    });
};
