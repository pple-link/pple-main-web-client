import React from 'react';
import { styled, ButtonBase } from '@mui/material';

type Status = {
  status: string;
};

const StyledButton = styled(ButtonBase)<Status>(({ status }) => ({
  padding: '9px 16px',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: status == 'DELETE' ? '#EEEEEE' : '#FF6969',
  color: status == 'DELETE' ? '#B7B7B7' : 'white',
  fontSize: '15px',
  '&:hover': {
    backgroundColor: '#FF6980',
    borderColor: '#FF6980',
    boxShadow: 'none',
  },
  fontWeight: 'bolder',
  fontFamily: 'Pretendard',
  border: status == 'DELETE' ? '1px solid #B7B7B7' : 'none',
}));

interface Props {
  text: string;
  onClick?: any;
  status?: string;
}

const RadiusButton: React.FC<Props> = ({ text, onClick, status }) => {
  return (
    <div>
      <StyledButton
        status={status}
        disabled={status == 'DELETE'}
        onClick={onClick}
      >
        {text}
      </StyledButton>
    </div>
  );
};

export default RadiusButton;
