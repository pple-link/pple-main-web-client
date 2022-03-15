import React, { useState } from 'react';
import { styled, Paper, IconButton } from '@mui/material';
import Modal from 'react-modal';
import ModalButton from './ModalButton';
import trashBasket from '../../../static/images/modal/trashbasket.png';
import CloseIcon from '@mui/icons-material/Close';
import { deleteDonation } from '../../../lib/api/donation';
import DoneDeleteModal from './DoneDeleteModal';

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

const DeleteModal: React.FC<Props> = ({ open, setOpen, donationUuid, jwt }) => {
  const [done, setDone] = useState<boolean>(false);
  const onClick = () => {
    setOpen(!open);
  };
  const handleDelete = () => {
    deleteDonation(donationUuid, jwt);
    setOpen(!open);
    setDone(!done);
  };
  return (
    <>
      <DoneDeleteModal open={done} setOpen={setDone} />
      <StyledModal
        isOpen={open}
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.4)' } }}
      >
        <StylePaper elevation={2}>
          {/* 닫기 버튼 */}
          <CloseBox>
            <IconButton
              sx={{ marginTop: '10px', marginRight: '10px' }}
              onClick={onClick}
            >
              <CloseIcon style={{ color: '#C7C7C7' }} />
            </IconButton>
          </CloseBox>
          {/* 이미지 영억 */}
          <ImageBox>
            <img src={trashBasket} alt="시계 이미지" width={90} height={90} />
          </ImageBox>
          {/* 제목 */}
          <TitleBox>사연을 삭제하시겠어요?</TitleBox>
          <ContentBox>
            사연은 복원되지 않고
            <br />
            영구 삭제됩니다
          </ContentBox>
          <ButtonBox>
            <ModalButton
              onClick={onClick}
              text="취소"
              background="#F4F4F4"
              color="#B7B7B7"
            />
            <ModalButton onClick={handleDelete} text="삭제" />
          </ButtonBox>
        </StylePaper>
      </StyledModal>
    </>
  );
};

export default DeleteModal;
