import { customAxios } from '../customAxios';
import { Like, Likes } from '../interface/Like';

export const likeDonation = (
  donationData: Like,
  currentAccountUuid: string,
) => {
  console.log(donationData);
  if (isAlreadyLike(donationData.likes, currentAccountUuid)) {
    return;
  }
  return customAxios
    .post(`/api/v1/donation/like/${donationData.donationUuid}`, {
      headers: { 'X-AUTH-TOKEN': `${donationData.jwt}` },
    })
    .catch(err => {
      console.log(err);
    });
};

const isAlreadyLike = (likes: Array<Likes>, accountUuid: string) => {
  const checkLikeAccountUuid = likes.filter(
    like => like.likeAccountUuid == accountUuid,
  );
  if (checkLikeAccountUuid.length == 0) return false;
  return true;
};
