import React, { useState } from 'react';
import Modal from 'react-modal';
import { styled, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Clock from '../../../static/images/modal/Clock.svg';
import ModalButton from './ModalButton';
import '../../../static/fonts/fonts.css';
import {
  deleteExpiredDonation,
  updateExpiredDonation,
} from '../../../lib/api/donation';
import ExtensionModal from './ExtensionModal copy';
import { getCookie } from '../../../lib/hooks/CookieUtil';

const StyledModal = styled(Modal)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Pretendard',
  outline: 'none',
});

const StylePaper = styled(Paper)({
  borderRadius: '20px',
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
  marginBottom: '25px',
});
const ButtonBox = styled('div')({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0px 25px 25px 25px',
});

interface Props {
  open: boolean;
  setOpen: any;
  donationUuid: string;
  jwt: string;
}

const StoryModal: React.FC<Props> = ({ open, setOpen, donationUuid, jwt }) => {
  const [extensionConfirmOpen, setExtensionConfirmOpen] =
    useState<boolean>(false);
  const onClick = () => {
    setOpen(!open);
  };

  const handleUpdate = () => {
    updateExpiredDonation(donationUuid, jwt);
    setOpen(!open);
    setExtensionConfirmOpen(!extensionConfirmOpen);
  };

  const handleDelete = () => {
    deleteExpiredDonation(donationUuid, jwt);
    setTimeout(function () {
      setOpen(!open);
      location.reload();
    }, 2000);
  };

  return (
    <>
      <ExtensionModal
        open={extensionConfirmOpen}
        setOpen={setExtensionConfirmOpen}
      />
      <StyledModal
        isOpen={open}
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.4)' } }}
      >
        <StylePaper elevation={2}>
          {/* ?????? ?????? */}
          <CloseBox>
            <IconButton
              sx={{ marginTop: '10px', marginRight: '10px' }}
              onClick={onClick}
            >
              <CloseIcon style={{ color: '#C7C7C7' }} />
            </IconButton>
          </CloseBox>
          {/* ????????? ?????? */}
          <ImageBox>
            <img src={Clock} alt="?????? ?????????" width={90} height={90} />
          </ImageBox>
          {/* ?????? */}
          <TitleBox>
            ????????? ?????? ????????? <br /> 6?????? ???????????????
          </TitleBox>
          <ContentBox>
            ????????? ???????????????
            <br /> ????????? ????????? ????????? ???????????? ???????????????
          </ContentBox>
          <ButtonBox>
            <ModalButton
              onClick={handleDelete}
              text="?????????"
              background="#F4F4F4"
              color="#B7B7B7"
            />
            <ModalButton onClick={handleUpdate} text="????????????" />
          </ButtonBox>
        </StylePaper>
      </StyledModal>
    </>
  );
};

export default StoryModal;
