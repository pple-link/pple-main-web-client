import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import ChannelTalk from '../components/common/buttons/ChannelTalk';
import HomeForm from '../container/HomeForm';
const HomepageBlock = styled('div')({
  fontFamily: 'Pretendard',
  '& .channel-talk': {
    width: '28rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    textAlign: 'end',
  },
});

const HomePage: React.FC = () => {
  return (
    <HomepageBlock>
      <HomeForm />
      <ChannelTalk />
    </HomepageBlock>
  );
};

export default HomePage;
