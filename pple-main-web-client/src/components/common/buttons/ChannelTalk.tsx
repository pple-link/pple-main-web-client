import React from 'react';
import { IconButton, styled } from '@mui/material';
import ChannelTalkImg from '../../../static/images/Talk.svg';

const ChannelTalkBlock = styled('div')({
  position: 'fixed',
  bottom: 0,
  right: 0,
});

const ChannelTalk = () => {
  const onClick = () => {
    window.location.href = 'https://open.kakao.com/o/gOg74umb';
  };

  return (
    <ChannelTalkBlock>
      <IconButton onClick={onClick}>
        <img src={ChannelTalkImg} alt="채널톡" />
      </IconButton>
    </ChannelTalkBlock>
  );
};

export default ChannelTalk;
