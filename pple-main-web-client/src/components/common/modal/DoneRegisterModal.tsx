import React, { useState } from 'react';
import Modal from 'react-modal';
import { styled, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Coin from '../../../static/images/modal/Coin.svg';
import '../../../static/fonts/fonts.css';

const StyledModal = styled(Modal)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Pretendard',
});

const StyledPaper = styled(Paper)({
  borderRadius: '20px',
  paddingBottom: '30px',
});

const CloseBox = styled('div')({
  width: '100%',
  textAlign: 'end',
});

const ImageBox = styled('div')({
  textAlign: 'center',
  marginBottom: '15px',
});

const TitleBox = styled('div')({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '22px',
  lineHeight: '28px',
  textAlign: 'center',
  color: '#222222',
  marginBottom: '10px',
});

const ContentBox = styled('div')({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '150%',
  textAlign: 'center',
  color: '#B7B7B7',
  padding: '0px 38px',
  minWidth: '280px',
});

interface Props {
  open: boolean;
  setOpen: any;
}

const DoneRegisterModal: React.FC<Props> = ({ open, setOpen }) => {
  const onClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <StyledModal
        isOpen={open}
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.4)' } }}
      >
        <StyledPaper elevation={1}>
          <CloseBox>
            <IconButton
              sx={{ marginTop: '10px', marginRight: '10px' }}
              onClick={onClick}
            >
              <CloseIcon style={{ color: '#C7C7C7' }} />
            </IconButton>
          </CloseBox>
          <ImageBox>
            <img src={Coin} alt="연장하기 완료" width={90} height={90} />
          </ImageBox>
          <TitleBox>
            사연 등록이 완료됐습니다.
            <br />
          </TitleBox>
          <ContentBox>
            사연은 7일후 자동 삭제 되며, 연장 유뮤를 선택하실 수 있습니다.
            <br />
            사연과 관련된 알림은 문자 또는 카카오톡으로 알림이 제공됩니다
          </ContentBox>
        </StyledPaper>
      </StyledModal>
    </>
  );
};

export default DoneRegisterModal;
