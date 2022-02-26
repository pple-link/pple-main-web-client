import React, { useState } from 'react';
import Modal from 'react-modal';
import { styled, Paper, IconButton, MobileStepper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Capture from '../../../static/images/modal/capture.svg';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import '../../../static/fonts/fonts.css';

const StyledModal = styled(Modal)({
  fontFamily: 'Pretendard',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overlay: {
    background: '#FFFF00',
  },
});
const StyledPaper = styled(Paper)({
  borderRadius: '20px',
  paddingBottom: '10px',
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
  width: 'max-content',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '28px',
  textAlign: 'center',
  color: '#222222',
  margin: '0px 33px 10px 33px',
});
const ContentBox = styled('div')({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '150%',
  textAlign: 'center',
  color: '#B7B7B7',
  padding: '0px 38px',
});
const PhoneBox = styled('div')({
  width: '100%',
  textAlign: 'center',
  marginTop: '25px',
  marginBottom: '50px',
  textDecoration: 'underline',
  textDecorationColor: '#C7C7C7',
});

interface Props {
  open: boolean;
  handleOpen: any;
  phoneNumber: string;
}

const createPhoneNumber = (phoneNumber: string): string => {
  const first = phoneNumber.slice(0, 3);
  const second = phoneNumber.slice(3, 7);
  const third = phoneNumber.slice(7, 11);
  return `${first} - ${second} - ${third}`;
};

const ConnectionModal: React.FC<Props> = ({
  open,
  handleOpen,
  phoneNumber,
}) => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const onClick = () => {
    handleOpen(open);
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
            <img src={Capture} alt="수혈자와 연락" width={90} height={90} />
          </ImageBox>
          <TitleBox>
            수혈자에게 수혈자 등록번호가 적힌
            <br />
            안내 문자 캡쳐본을 전달 받아주세요
          </TitleBox>
          <ContentBox>
            지정헌혈도움 이외의 대화는
            <br />
            삼가해주세요
          </ContentBox>
          <PhoneBox>{createPhoneNumber(phoneNumber)}</PhoneBox>
        </StyledPaper>
      </StyledModal>
    </>
  );
};

export default ConnectionModal;
