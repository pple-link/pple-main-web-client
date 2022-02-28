import React from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import task from '../../static/images/mypage-button/task.png';
import edit from '../../static/images/mypage-button/edit.png';
import heartSearch from '../../static/images/mypage-button/heart-search.png';
import heart from '../../static/images/mypage-button/Heart.png';
import messageQuestion from '../../static/images/mypage-button/message-question.png';
import shieldTick from '../../static/images/mypage-button/shield-tick.png';
import marketing from '../../static/images/mypage-button/marketing.png';
import { useNavigate } from 'react-router-dom';

const DIVIDER = styled('div')({
  backgroundColor: '#F4F4F4',
  width: '100%',
  height: '1px',
});

const List1 = styled(List)({
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 17,
  },
});

const List2 = styled(List)({
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 17,
  },
});
const SubTitle = styled('div')({
  color: '#B7B7B7',
  fontWeight: 'bold',
  padding: '17px 17px 20px 17px',
});

const MyPageList: React.FC = () => {
  const navigate = useNavigate();
  const handleFaq = () => {
    navigate('/page/faq');
  };
  const handleHelper = () => {
    navigate('/page/helper');
  };
  const handleStory = () => {
    navigate('/page/story');
  };
  const handleDonation = () => {
    navigate('/etc/1');
  };
  const handleService = () => {
     window.open('https://pple.notion.site/52ab3b73d5f64d5891c9f6723dae7848');
  };
  const handlePolicy = () => {
    window.open('https://pple.notion.site/a19608ee13a8436d900262685443c452');
      };
  const handleMarketing=()=>{
    window.open('https://pple.notion.site/aa6a393366354c6aa884b14a5d07dbc4');
};
  return (
    <div>
      <DIVIDER />
      <List1>
        <SubTitle>내정보</SubTitle>
        {/* <ListItemButton onClick={handleHelper}>
          <ListItemIcon>
            <img src={heart} alt="도움을 주신 분들" />
          </ListItemIcon>
          <ListItemText primary="도움을 주신 분들" />
        </ListItemButton> */}
        <ListItemButton onClick={handleStory}>
          <ListItemIcon sx={{ marginRight: '0px' }}>
            <img src={edit} alt="나의 사연" />
          </ListItemIcon>
          <ListItemText primary="나의 사연" />
        </ListItemButton>
        <ListItemButton onClick={handleFaq}>
          <ListItemIcon>
            <img src={messageQuestion} alt="FAQ" />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItemButton>
      </List1>
      <DIVIDER />
      <List2>
        <SubTitle>서비스 정보</SubTitle>
        <ListItemButton onClick={handleDonation}>
          <ListItemIcon>
            <img src={heartSearch} alt="지정헌혈이란" />
          </ListItemIcon>
          <ListItemText primary="지정헌혈이란" />
        </ListItemButton>
        <ListItemButton onClick={handlePolicy}>
          <ListItemIcon>
            <img src={shieldTick} alt="개인정보 처리방침" />
          </ListItemIcon>
          <ListItemText primary="개인정보 처리방침" />
        </ListItemButton>
        <ListItemButton onClick={handleService}>
          <ListItemIcon>
            <img src={task} alt="서비스 이용약관" />
          </ListItemIcon>
          <ListItemText primary="서비스 이용약관" />
        </ListItemButton>
        <ListItemButton onClick={handleMarketing}>
          <ListItemIcon>
            <img
              src={marketing}
              alt="마케팅 활용 동의"
              style={{ color: 'gray' }}
            />
          </ListItemIcon>
          <ListItemText primary="마케팅 활용 동의" />
        </ListItemButton>
      </List2>
    </div>
  );
};
  

export default MyPageList;
