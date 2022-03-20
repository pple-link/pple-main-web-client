import React, { useState } from 'react';
import { styled, Paper, IconButton } from '@mui/material';
import Modal from 'react-modal';
import ModalButton from './ModalButton';
import CloseIcon from '@mui/icons-material/Close';
import { deleteComment } from '../../../lib/api/comment';

interface Props {
  open: boolean;
  setOpen: any;
  replyUuid: string;
  jwt: string;
}

const DeleteCommentModal: React.FC<Props> = ({
  open,
  setOpen,
  replyUuid,
  jwt,
}) => {
  const onClick = () => {
    setOpen(!open);
  };
  const onClickDelete = () => {
    new Promise((resolve, reject) => {
      resolve(deleteComment(replyUuid, jwt));
    }).then(res => {
      setOpen(!open);
      window.location.reload();
    });
  };
  return (
    <>
      <StyledModal
        isOpen={open}
        style={{ overlay: { background: 'rgba(0, 0, 0, 0.4)' } }}
      >
        <StylePaper elevation={2}>
          <CloseBox>
            <IconButton
              sx={{ marginTop: '10px', marginRight: '10px' }}
              onClick={onClick}
            >
              <CloseIcon style={{ color: '#C7C7C7' }} />
            </IconButton>
          </CloseBox>

          <TitleBox>
            댓글을 <br /> 삭제하시겠어요?
            <br />
          </TitleBox>

          <ButtonBox>
            <ModalButton
              onClick={onClick}
              text="취소"
              background="#F4F4F4"
              color="#B7B7B7"
            />
            <ModalButton onClick={onClickDelete} text="삭제" />
          </ButtonBox>
        </StylePaper>
      </StyledModal>
    </>
  );
};

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
  marginBottom: '20px',
  padding: '0px 55px 0px 55px',
});

const ButtonBox = styled('div')({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0px 10px 25px 10px',
});

export default DeleteCommentModal;
