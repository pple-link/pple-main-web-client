import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getKakaoRedirectURL } from '../../api/oatuh';
import { customAxios } from '../../lib/customAxios';

const HandleOAuthRedirectUrl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    getKakaoRedirectURL(code);
  });
  return <div></div>;
};

export default HandleOAuthRedirectUrl;
