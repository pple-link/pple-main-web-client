export const notifyError = (errorCode: number) => {
  switch (errorCode) {
    case 404:
      alert('서버 문제입니다. 관리자에게 문의해주세요 ');
      break;
    case 400:
      alert('Bad Request');
      break;
    default:
      break;
  }
};
