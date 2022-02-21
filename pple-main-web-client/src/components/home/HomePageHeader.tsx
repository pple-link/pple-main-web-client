import React, { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  styled,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
} from '@mui/material';
import PaperPlus from '../../static/images/PaperPlus.png';
import Calendar from '../../static/images/Calendar.png';
import MenuIcon from '@mui/icons-material/Menu';
import Home from '../../static/images/menu/Home.svg';
import Mypage from '../../static/images/menu/Mypage.svg';
import MenuLogo from '../../static/images/menu/MenuLogo.svg';
import { borderRadius } from '@mui/system';
import { useCookies } from 'react-cookie';
import { checkUser, getCookie } from '../../lib/hooks/CookieUtil';
import LoginRequestModal from '../common/modal/LoginRequestModal';

const HomePageHeaderBlock = styled('div')({
  background: 'linear-gradient(109.4deg, #ff6969 -3.19%, #ff3333 109.95%)',
  borderRadius: '0px 0px 30px 30px',
  padding: '60px 16px 25px 16px',
});

const Title = styled('div')({
  color: 'white',
  marginBottom: '25px',
  fontSize: '24px',
  display: 'flex',
  justifyContent: 'space-between',
});

const ButtonGroup = styled('div')({
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
    fontSize: 'x-small',
    textAlign: 'start',
    Letter: '-0.24px',
    fontWeight: '500',
    margin: '0px',
    lineHeight: '16px',
  },
  '& .button-text-bottom': {
    fontSize: 'large',
    fontWeight: 'bold',
    margin: '0px',
    lineHeight: '16px',
  },
});

const HomeButton = styled(Button)({
  width: '45%',
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

const StyledBox = styled(Box)({
  width: 250,
  background: '#FF6969',
  height: '100%',
  color: 'white',
  padding: '60px 0px 0px 46px',
  '& .list .list-item:hover': {
    background: '#AEAEAE',
    borderRadius: '14px',
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
    if (jwt !== undefined) {
      navigate('/page');
      return;
    }
    setModalOpen(!modalOpen);
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
            <MenuIcon />
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
