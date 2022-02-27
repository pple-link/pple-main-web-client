import React from 'react';
import MLoginBody from '../../components/auth/login/MLoginBody';

const LoginForm: React.FC = () => {
  const KAKAO_REQUEST_URL = `https://kauth.kakao.com/oauth/authorize?client_id=bff1299ce3567f996239cc2be9cd2d23&redirect_uri=https://pple-test.herokuapp.com/auth/kakao/callback&response_type=code`;
  const handleKakaoLogin = () => {
    location.href = KAKAO_REQUEST_URL;
  };
  const handleAppleLogin = () => {
    console.log('AppleLogin');
  };
  return (
    <MLoginBody
      handleKakaoLogin={handleKakaoLogin}
      handleAppleLogin={handleAppleLogin}
    />
  );
};

export default LoginForm;
