import React, { useState } from 'react';
import { styled, Paper } from '@mui/material';
import FeedHeader from '../../../common/feed/FeedHeader';
import FeedPatientInfo from '../../../common/feed/FeedPatientInfo';
import FeedContent from '../../../common/feed/FeedContent';
import FeedFooter from '../../../common/feed/FeedFooter';
import { useNavigate } from 'react-router-dom';
import FeedUserInfo from './FeedUserInfo';
import ConnectionModal from '../../../common/modal/ConnectionModal';

const FeedTemplateBlock = styled('div')({
  '& .feed': {
    cursor: 'pointer',
  },
});
const FeedBox = styled('div')({
  marginTop: '15px',
  marginBottom: '15px',
});
const FeedContentBox = styled('div')({
  padding: '0px 15px 18px 15px',
  background: '#FFFFFF',
  borderRadius: '0px 0px 14px 14px',
});

// 피드 정보 배열로 받기
interface Props {
  bloodType: string;
  sort: string;
  time: string;
  displayName: string;
  profileImageUrl: string;
  phoneNumber: string;
  title: string;
  content: string;
  uuid: string;
}

const FeedTemplate: React.FC<Props> = ({
  bloodType,
  sort,
  time,
  displayName,
  title,
  content,
  phoneNumber,
  profileImageUrl,
  uuid,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const onClick = () => {
    navigate(`/post/${uuid}`);
  };

  return (
    <FeedTemplateBlock>
      <Paper
        className="feed"
        sx={{
          borderRadius: '14px',
          border: 'none',
          filter: ' drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.1))',
          boxShadow: '5px 5px 6px 0px rgba(0,0,0,0.05)',
        }}
        elevation={1}
      >
        <FeedBox>
          <FeedHeader
            onClick={handleOpen}
            bloodType={bloodType}
            sort={sort}
            buttonText="도움주기"
            time={time}
          />
          <FeedContentBox onClick={onClick}>
            <FeedUserInfo
              imgUrl={profileImageUrl}
              time={time}
              nickname={displayName}
            />
            <FeedContent title={title} content={content} />
          </FeedContentBox>
        </FeedBox>
      </Paper>
      <ConnectionModal
        phoneNumber={phoneNumber}
        open={open}
        handleOpen={handleOpen}
      />
    </FeedTemplateBlock>
  );
};

export default FeedTemplate;
