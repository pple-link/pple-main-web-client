import React from 'react';
import MLoginBody from '../../components/auth/login/MLoginBody';
import { clickLogin } from '../../lib/ampli';

const LoginForm: React.FC = () => {
  const KAKAO_REQUEST_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BASE_URL}/auth/kakao/callback&response_type=code`;
  const handleKakaoLogin = () => {
    location.href = KAKAO_REQUEST_URL;
    clickLogin();
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
