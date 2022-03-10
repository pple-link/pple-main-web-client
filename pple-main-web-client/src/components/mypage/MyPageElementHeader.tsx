import React from 'react';
import { styled, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import trash from '../../static/images/feed/trash.png';

const Block = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0px 12px 14px',
  color: '#222222',
  fontWeight: 'bold',
  '& .icon': {
    width: '33%',
  },
  '& .title': {
    width: '33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(5%)',
  },
  '& .blank': {
    width: '33%',
    display: 'flex',
    justifyContent: 'end',
    paddingRight: '16px',
    '& img': {
      cursor: 'pointer',
    },
  },
});

interface IHeader {
  title: string;
  isModify?: boolean;
  setOpen?: any;
  open?: boolean;
}

const MyPageElementHeader: React.FC<IHeader> = ({
  title,
  isModify,
  setOpen,
  open,
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const onClick = () => {
    setOpen(!open);
  };

  return (
    <Block>
      <div className="icon">
        <IconButton onClick={handleBack}>
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      </div>

      <div className="title">{title}</div>
      {isModify ? (
        <div className="blank" onClick={onClick}>
          <img src={trash} width={24} height={24} />
        </div>
      ) : (
        <div className="blank"></div>
      )}
    </Block>
  );
};

export default MyPageElementHeader;
