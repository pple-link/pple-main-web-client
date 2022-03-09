import amplitude from 'amplitude-js';

export const clickPostRegister = () =>
  amplitude.getInstance().logEvent('요청 글 등록하기');

export const clickShowAll = () => {
  amplitude.getInstance().logEvent('전체 보기');
};

export const clickLogin = () => {
  amplitude.getInstance().logEvent('로그인');
};

export const clickHelpButton = () => {
  amplitude.getInstance().logEvent('도움 주기');
};

export const clickModifyDonationPost = () => {
  amplitude.getInstance().logEvent('사연 수정');
};

export const clickIntroButton = () => {
  amplitude.getInstance().logEvent('소개 페이지 버튼 클릭');
};
