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

const ExtensionModal: React.FC<Props> = ({ open, setOpen }) => {
  const onClick = () => {
    setOpen(!open);
    location.reload();
  };

  return (
    <>
      <StyledModal
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.4)' } }}
        isOpen={open}
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
            요청 사연이
            <br />
            연장되었습니다
          </TitleBox>
          <ContentBox>
            사연은 7일 동안
            <br /> 게시됩니다
          </ContentBox>
        </StyledPaper>
      </StyledModal>
    </>
  );
};

export default ExtensionModal;
