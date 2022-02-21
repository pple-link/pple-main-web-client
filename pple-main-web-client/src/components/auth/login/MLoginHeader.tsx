import React from 'react';
import { styled } from '@mui/material';
import appLogo from '../../../static/images/logo.svg';

const MLoginHeaderBlock = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  '& .app-logo': {
    marginBottom: '1rem',
  },
  '& .login-title': {
    fontSize: 'x-large',
    lineHeight: '2rem',
  },
});

const MLoginHeader: React.FC = () => {
  return (
    <MLoginHeaderBlock className="header">
      <div className="app-logo">
        <img src={appLogo} alt="앱로고" />
      </div>
      <div className="login-title">
        안녕하세요
        <br />
        세상을 바꾸는 모임, 피플입니다
      </div>
    </MLoginHeaderBlock>
  );
};

export default MLoginHeader;
