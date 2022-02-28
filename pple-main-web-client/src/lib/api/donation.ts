import { useNavigate } from 'react-router-dom';
import { customAxios } from '../customAxios';
import PostDonation from '../interface/PostDontaion';

export const postDonation = (body: PostDonation, jwt: string) => {
  return customAxios.post('/api/v1/donation', body, {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};

export const updateDonation = (
  donationUuid: string,
  parameter: any,
  jwt: string,
) => {
  return customAxios.post(`/api/v1/donation/${donationUuid}`, parameter, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-AUTH-TOKEN': `${jwt}`,
    },
  });
};

export const getDonationsOfActiveStatus = () => {
  return customAxios.get('/api/v1/donation', {
    params: { status: 'ACTIVE' },
  });
};

export const getOwnDonations = (jwt: string) => {
  return customAxios.get('/api/v1/donation/own', {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};

export const getExpiredDonations = (jwt: string) => {
  return customAxios.get('/api/v1/account/donation/days', {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};

export const getExpiredDonationsTest = () => {
  return customAxios.get('/api/v1/account/donation/gus5427@naver.com/test');
};

export const updateExpiredDonation = (donationUuid: string, jwt: string) => {
  return customAxios
    .post(`/api/v1/account/donation/renew/${donationUuid}`, {
      headers: { 'X-AUTH-TOKEN': `${jwt}` },
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      console.log('Updating Donation is failed');
    });
};

export const deleteExpiredDonation = (donationUuid: string, jwt: string) => {
  return customAxios
    .patch(`/api/v1/donation/delete/${donationUuid}`, {
      headers: { 'X-AUTH-TOKEN': `${jwt}` },
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      console.log('Deleting Donation is failed');
    });
};
