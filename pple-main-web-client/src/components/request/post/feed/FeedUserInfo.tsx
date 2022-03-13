import React from 'react';
import { styled, Avatar } from '@mui/material';
import NickNameWithBloodType from '../../../common/NickNameWithBloodType';
import { createTimeFormatForDetailFeedHeader } from '../../../../lib/util';

const FeedUserInfoBlock = styled('div')({
  height: '100%',
  display: 'flex',
  alignContent: 'center',
  marginTop: '17px',
  marginBottom: '17px',
  '& .first': {
    marginRight: '7.42px',
  },
});

const UserInfoBox = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignContent: 'center',
  '& .time': {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '10.7893px',
    lineHeight: '13px',
    letterSpacing: '0.01em',
    color: '#AEAEAE',
  },
});

interface UserInfo {
  nickname: string;
  time: string;
  imgUrl: string;
}

const FeedUserInfo: React.FC<UserInfo> = ({ nickname, time, imgUrl }) => {
  return (
    <FeedUserInfoBlock>
      <div className="first">
        <Avatar src={imgUrl}></Avatar>
      </div>
      <div className="seconde">
        <UserInfoBox>
          <NickNameWithBloodType nickname={nickname} />
          <div className="time">
            {time ? createTimeFormatForDetailFeedHeader(time) : ''}
          </div>
        </UserInfoBox>
      </div>
    </FeedUserInfoBlock>
  );
};

export default FeedUserInfo;
