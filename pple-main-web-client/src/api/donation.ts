import { customAxios } from '../lib/customAxios';

export const updateDonation = (donationUuid: string, parameter: any) => {
  customAxios.patch(`/api/v1/donation/${donationUuid}`, {
    parameter,
  });
};

export const getOwnDonations = (params: any | null, jwt: string) => {
  return customAxios.get('/api/v1/donation/own', {
    params: params,
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};
