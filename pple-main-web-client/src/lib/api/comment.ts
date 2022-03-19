import { customAxios } from '../customAxios';

export const saveComment = (
  jwt: string,
  body: { content: string; donationUuid: string },
) => {
  return customAxios.post('/api/v1/donation/reply/test', body, {
    headers: { 'X-AUTH-TOKEN': `${jwt}` },
  });
};

export const deleteComment = (replyUuid: string, jwt: string) => {
  return customAxios.delete(`/api/v1/reply/delete/${replyUuid}/test`, {
    headers: {
      'X-AUTH-TOKEN': `${jwt}`,
    },
  });
};

export const reportComment = (
  replyUuid: string,
  accountUuid: string,
  donationUuid: string,
) => {
  return customAxios
    .post(`/api/v1/report/reply`, {
      replyUuid: replyUuid,
      accountUuid: accountUuid,
      donationUuid: donationUuid,
    })
    .catch(err => {
      console.log(err);
    });
};
