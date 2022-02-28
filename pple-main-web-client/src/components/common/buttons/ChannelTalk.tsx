import React from 'react';
import { IconButton, styled } from '@mui/material';
import ChannelTalkImg from '../../../static/images/channelTalk.png';

const ChannelTalkBlock = styled('div')({
  position: 'fixed',
  bottom: 0,
  right: 0,
});

const ChannelTalk = () => {
  const onClick = () => {
    window.open('https://open.kakao.com/o/gOg74umb');
  };

  return (
    <ChannelTalkBlock>
      <IconButton onClick={onClick}>
        <img src={ChannelTalkImg} alt="채널톡" width={70} height={70} />
      </IconButton>
    </ChannelTalkBlock>
  );
};

export default ChannelTalk;
