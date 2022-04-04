export const notifyError = (errorCode: number) => {
  switch (errorCode) {
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
