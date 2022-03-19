import { customAxios } from '../customAxios';
import { Like, Likes } from '../interface/Like';

export const likeDonation = (donationData: Like) => {
  return customAxios
    .post(`/api/v1/donation/like/${donationData.donationUuid}`, '', {
      headers: { 'X-AUTH-TOKEN': `${donationData.jwt}` },
    })
    .catch(err => {
      console.log(err);
    });
};
