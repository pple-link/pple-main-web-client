import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { customAxios } from '../../lib/customAxios';

const HandleOAuthRedirectUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const sendAuthorizationCodeToServer = (code: string) => {
    customAxios
      .get(`/auth/kakao/callback?code=${code}`)
      .then(res => {
        console.log('전송성공');
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    const code = searchParams.get('code');
    sendAuthorizationCodeToServer(code);
    // navigate('/');
  });
  return <div></div>;
};

export default HandleOAuthRedirectUrl;
