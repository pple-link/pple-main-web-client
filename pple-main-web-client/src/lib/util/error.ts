import { AxiosError } from 'axios';

export const notifyError = (err: Error) => {
  const error = err as AxiosError;
  switch (error.response.status) {
    case 404:
    case 500:
      alert('서버 문제입니다. 관리자에게 문의해주세요 ');
      break;

    case 400:
      alert('잘못된 요청입니다.');
      break;

    default:
      break;
  }
};
