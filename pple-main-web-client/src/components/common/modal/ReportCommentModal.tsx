import React, { useState } from 'react';
import { styled, Paper, IconButton } from '@mui/material';
import Modal from 'react-modal';
import ModalButton from './ModalButton';
import trashBasket from '../../../static/images/modal/trashbasket.png';
import CloseIcon from '@mui/icons-material/Close';
import { reportComment } from '../../../lib/api/comment';

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

const TitleBox = styled('div')({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '22px',
  lineHeight: '28px',
  textAlign: 'center',
  color: '#222222',
  marginBottom: '10px',
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
  replyUuid: string;
  accountUuid: string;
  donationUuid: string;
}

const ReportCommentModal: React.FC<Props> = ({
  open,
  setOpen,
  replyUuid,
  accountUuid,
  donationUuid,
}) => {
  const onClick = () => {
    setOpen(!open);
  };
  const handleDelete = () => {
    new Promise((resolve, reject) => {
      resolve(reportComment(replyUuid, accountUuid, donationUuid));
    })
      .then(res => {
        setOpen(!open);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
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
          {/* 제목 */}
          <TitleBox>댓글을 신고하시겠어요?</TitleBox>
          <ButtonBox>
            <ModalButton
              onClick={onClick}
              text="취소"
              background="#F4F4F4"
              color="#B7B7B7"
            />
            <ModalButton onClick={handleDelete} text="신고" />
          </ButtonBox>
        </StylePaper>
      </StyledModal>
    </>
  );
};

export default ReportCommentModal;
