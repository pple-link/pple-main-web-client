import { customAxios } from '../lib/customAxios';

export const updateDonation = (donationUuid: string, parameter: any) => {
  customAxios.patch(`/api/v1/donation/${donationUuid}`, {
    parameter,
  });
};
