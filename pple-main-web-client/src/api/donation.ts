import { customAxios } from '../lib/customAxios';

export const updateDonation = (donationUuid: string, parameter: any) => {
  return customAxios.patch(`/api/v1/donation/${donationUuid}`, {
    parameter,
  });
};

export const getOwnDonations = (jwt: string) => {
  return customAxios.get('/api/v1/donation/own', {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};
