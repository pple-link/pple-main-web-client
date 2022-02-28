import React, { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Box, Button, IconButton } from '@mui/material';
import PaperPlus from '../../static/images/PaperPlus.png';
import Calendar from '../../static/images/Calendar.png';
import Hamberger from '../../static/images/Hamberger.svg';
import { getCookie } from '../../lib/hooks/CookieUtil';
import LoginRequestModal from '../common/modal/LoginRequestModal';

const HomePageHeaderBlock = styled('div')({
  fontFamily: 'Pretendard',
  background: 'linear-gradient(109.4deg, #FF6969 -3.19%, #FF3333 109.95%);',
  borderRadius: '0px 0px 30px 30px',
  padding: '60px 16px 25px 16px',
});

const Title = styled('div')({
  color: 'white',
  marginBottom: '25px',
  fontSize: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  lineHeight: '120%',
});

const ButtonGroup = styled('div')({
  fontFamily: 'Pretendard',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '100%',
});

const ButtonContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  marginLeft: '5px',
  '& .button-text-top': {
    fontSize: 'small',
    textAlign: 'start',
    Letter: '-0.24px',
    fontWeight: '600',
    margin: '0px',
    lineHeight: '18px',
    fontFamily: 'Pretendard',
  },
  '& .button-text-bottom': {
    fontSize: 'large',
    fontWeight: 'bold',
    margin: '0px',
    lineHeight: '18px',
    fontFamily: 'Pretendard',
  },
});

const HomeButton = styled(Button)({
  width: '48%',
  padding: '8px 0px 12px 0px',
  display: 'flex',
  alignItems: 'center',
  background:
    'linear-gradient(104.83deg, rgba(255, 255, 255, 0.3) -5.98%, rgba(255, 255, 255, 0.1) 107.85%)',
  boxShadow:
    'inset 3px 3px 2px rgba(255, 255, 255, 0.12), inset -2px -2px 2px rgba(167, 0, 0, 0.1)',
  backdropFilter: 'blur(4px)',
  borderRadius: '30px',
  '&:hover': {
    background:
      'linear-gradient(104.83deg, rgba(255, 255, 255, 0.3) -5.98%, rgba(255, 255, 255, 0.1) 107.85%)',
    boxShadow:
      'inset 3px 3px 2px rgba(255, 255, 255, 0.12), inset -2px -2px 2px rgba(255, 0, 0, 0.1)',
    backdropFilter: 'blur(4px)',
  },
});

interface HomeHeaderProps {
  name: string;
}

const HomePageHeader: React.FC<HomeHeaderProps> = ({ name }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const jwt = getCookie();
  const navigate = useNavigate();
  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const goPage = () => {
    navigate('/page');
  };

  const goRequestRegister: MouseEventHandler = () => {
    if (isAuth()) {
      navigate('/post/register');
      return;
    }
    setModalOpen(!modalOpen);
  };
  const goReserve: MouseEventHandler = () => {
    window.open('https://www.bloodinfo.net/blood_reserve.do');
  };
  const isAuth = (): boolean => {
    if (jwt == undefined) {
      return false;
    }
    return true;
  };

  return (
    <HomePageHeaderBlock>
      <LoginRequestModal open={modalOpen} onClick={handleModalOpen} />
      <Title>
        <div>
          <div>
            안녕하세요,<strong style={{ fontWeight: 'bold' }}>{name}님!</strong>
          </div>
          <div>오늘도 건강하고 행복하세요!</div>
        </div>
        <div className="menu">
          <IconButton sx={{ color: 'white' }} onClick={goPage}>
            <img
              style={{ transform: 'translate(0,-5px)' }}
              src={Hamberger}
              alt=""
              width={25}
              height={25}
            />
          </IconButton>
        </div>
      </Title>
      <ButtonGroup>
        <HomeButton variant="contained" onClick={goRequestRegister}>
          <img src={PaperPlus} alt="A" style={{ marginTop: '9px' }} />
          <ButtonContent>
            <div className="button-text-top">지정헌혈</div>
            <div className="button-text-bottom">요청하기</div>
          </ButtonContent>
        </HomeButton>
        <HomeButton variant="contained" onClick={goReserve}>
          <img src={Calendar} alt="A" style={{ marginTop: '7px' }} />
          <ButtonContent>
            <div className="button-text-top">헌혈</div>
            <div className="button-text-bottom">예약하기</div>
          </ButtonContent>
        </HomeButton>
      </ButtonGroup>
    </HomePageHeaderBlock>
  );
};

export default HomePageHeader;
