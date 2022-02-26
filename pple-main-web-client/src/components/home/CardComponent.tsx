import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';
import FeedHeader from '../common/feed/FeedHeader';
import FeedContent from '../common/feed/FeedContent';
import { StringifyOptions } from 'querystring';
import ConnectionModal from '../common/modal/ConnectionModal';
import LoginRequestModal from '../common/modal/LoginRequestModal';
import { getCookie } from '../../lib/hooks/CookieUtil';

const CardComponentBlock = styled('div')({
  width: '100%',
  marginTop: '15px',
});

const CardContentBox = styled('div')({
  padding: '8px 27px',
});

const CardPaper = styled('div')({
  borderRadius: '14px',
  border: '1px solid rgba(0,0,0,0.03)',
  filter: ' drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.1))',
  boxShadow: '5px 5px 6px 0px rgba(0,0,0,0.05)',
});

const ContentWithMore = styled('div')({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '-0.03em',
  color: '#222222',
  margin: '17px 0px',
  padding: '0px 17px 0px 17px',
  '& button': {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
});

interface Props {
  title: string;
  content: string;
  sort: string;
  bloodType: string;
  time: string;
  phoneNumber: string;
}

const CardComponent: React.FC<Props> = ({
  title,
  content,
  sort,
  bloodType,
  time,
  phoneNumber,
}) => {
  const [detail, setDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const jwt = getCookie();
  const handleOpen = (open: boolean) => {
    setOpen(!open);
  };
  const handleDetail = () => {
    setDetail(!detail);
  };
  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };

  const onClick = () => {
    if (jwt == undefined) {
      handleLoginOpen();
      return;
    }
    setOpen(!open);
  };

  return (
    <CardComponentBlock>
      <LoginRequestModal open={loginOpen} onClick={handleLoginOpen} />
      <CardPaper>
        <FeedHeader
          bloodType={bloodType}
          sort={sort}
          buttonText="도움주기"
          time={time}
          onClick={onClick}
        />
        {detail ? (
          <CardContentBox>
            <FeedContent title={title} content={content} />
          </CardContentBox>
        ) : (
          <ContentWithMore>
            {title.slice(0, 22)}
            <button style={{ color: '#B7B7B7' }} onClick={handleDetail}>
              ...더보기
            </button>
          </ContentWithMore>
        )}
      </CardPaper>
      <ConnectionModal
        handleOpen={handleOpen}
        open={open}
        phoneNumber={phoneNumber}
      />
    </CardComponentBlock>
  );
};

export default CardComponent;
