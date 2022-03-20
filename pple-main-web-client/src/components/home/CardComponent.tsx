import React, { useState } from 'react';
import { styled } from '@mui/system';
import { IconButton, Paper } from '@mui/material';
import FeedHeader from '../common/feed/FeedHeader';
import FeedContent from '../common/feed/FeedContent';
import { StringifyOptions } from 'querystring';
import ConnectionModal from '../common/modal/ConnectionModal';
import LoginRequestModal from '../common/modal/LoginRequestModal';
import { getCookie } from '../../lib/hooks/CookieUtil';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  content: string;
  sort: string;
  bloodType: string;
  time: string;
  phoneNumber: string;
  donationUuid: string;
}

const CardComponent: React.FC<Props> = ({
  title,
  content,
  sort,
  bloodType,
  time,
  phoneNumber,
  donationUuid,
}) => {
  const [detail, setDetail] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  const jwt = getCookie();
  const handleOpen = (open: boolean) => {
    setOpen(!open);
  };
  const handleDetail = () => {
    // setDetail(!detail);
    navigate(`/post/${donationUuid}`);
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
            <ReduceButton>
              <IconButton
                sx={{ color: '#B7B7B7', textAlign: 'center' }}
                onClick={handleDetail}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </ReduceButton>
          </CardContentBox>
        ) : (
          <ContentWithMore>
            <span>{title.slice(0, 22)}</span>
            <button
              style={{ color: '#D8D8D8', fontSize: '13px' }}
              onClick={handleDetail}
            >
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

const CardComponentBlock = styled('div')({
  width: '100%',
  marginTop: '15px',
});

const CardContentBox = styled('div')({
  padding: '8px 27px',
  boxSizing: 'border-box',
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
  fontSize: '17px',
  lineHeight: '22px',
  letterSpacing: '-0.03em',
  color: '#222222',
  margin: '17px 0px',
  padding: '0px 50px 0px 30px',
  '& button': {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
});

const ReduceButton = styled('div')({
  width: '100%',
  textAlign: 'center',
  marginTop: '10px',
});

export default CardComponent;
