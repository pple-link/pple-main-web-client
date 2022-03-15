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

export const getOneDonation = (donationUuid: string) => {
  return customAxios.get(`/api/v1/donation/one/${donationUuid}`);
};

export const getDonationsOfActiveStatus = () => {
  return customAxios.get('/api/v1/donation/all');
};

export const getOwnDonations = (jwt: string) => {
  return customAxios.get('/api/v1/donation/own', {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};

export const getExpiredDonations = (jwt: string) => {
  return customAxios.get('/api/v1/account/donation/days', {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
    params: { validDays: '6' },
  });
};

export const getExpiredDonationsTest = () => {
  return customAxios.get('/api/v1/account/donation/gus5427@naver.com/test', {});
};

export const updateExpiredDonation = (donationUuid: string, jwt: string) => {
  return customAxios
    .post(`/api/v1/account/donation/renew/${donationUuid}`, {
      headers: { 'X-AUTH-TOKEN': `${jwt}` },
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
    .catch(err => {
      console.log(err);
      console.log('Deleting Donation is failed');
    });
};

export const deleteDonation = (donationUuid: string, jwt: string) => {
  return customAxios
    .delete(`/api/v1/donation/delete/${donationUuid}/test`, {
      headers: { 'X-AUTH-TOKEN': `${jwt}` },
    })
    .catch(err => {
      console.log(err);
    });
};

export const postDonationLike = (donationUuid: string, jwt: string) => {
  return customAxios
    .post(`/api/v1/donation/like/${donationUuid}`, {
      headers: { 'X-AUTH-TOKEN': `${jwt}` },
    })
    .catch(err => {
      console.log(err);
    });
};
