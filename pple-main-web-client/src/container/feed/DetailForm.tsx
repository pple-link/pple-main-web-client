import { CircularProgress, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailPost from '../../components/request/post/DetailPost';
import { getAccountProfile } from '../../lib/api/account';
import { saveComment } from '../../lib/api/comment';
import { getOneDonation } from '../../lib/api/donation';
import { getCookie } from '../../lib/hooks/CookieUtil';
import IDetailPost from '../../lib/interface/IDetailPost';
import { RootState } from '../../models';
import LoginRequestModal from '../../components/common/modal/LoginRequestModal';
import { Like } from '../../lib/interface/Like';
import { likeDonation } from '../../lib/api/like';

const DetailForm: React.FC = () => {
  const jwt = getCookie();
  const param = useParams();
  const commentValue = useSelector((state: RootState) => state.comment.comment);
  const donationUuid = param.donationUuid;
  const [detailPostInfo, setDetailPostInfo] = useState<IDetailPost>();
  const [currentUserImageUrl, setCurrentUserImageUrl] = useState<string>('');
  const [submitCheck, setSubmitCheck] = useState<boolean>(false);
  const [likeCheck, setLikeCheck] = useState<boolean>(false);
  const [firstCall, setFirstCall] = useState<boolean>(true);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const handleLoginModalOpen = () => {
    setLoginModalOpen(!loginModalOpen);
  };

  const onClickLike = (donationData: Like) => {
    setLikeCheck(!likeCheck);
    likeDonation(donationData);
  };

  const onSubmitComment = (event: any) => {
    event.preventDefault();
    if (!jwt) {
      handleLoginModalOpen();
    }
    if (commentValue) {
      setSubmitCheck(!submitCheck);
      saveComment(jwt, { content: commentValue, donationUuid }).catch(err => {
        console.log(err);
      });
    }
  };

  useEffect(() => {
    if (jwt && firstCall) {
      setFirstCall(!firstCall);
      getAccountProfile(jwt).then(res => {
        setCurrentUserImageUrl(res.data.profileImageUrl);
      });
    }
    setTimeout(() => {
      getOneDonation(donationUuid).then(res => {
        setDetailPostInfo(res.data);
      });
    }, 1000);
  }, [submitCheck, likeCheck]);

  return detailPostInfo ? (
    <>
      <form onSubmit={onSubmitComment}>
        <DetailPost
          jwt={jwt}
          bloodProduct={detailPostInfo.bloodProduct}
          patient={detailPostInfo.patient}
          writer={detailPostInfo.writer}
          createdAt={detailPostInfo.createdAt}
          reply={detailPostInfo.reply}
          title={detailPostInfo.title}
          content={detailPostInfo.content}
          likes={detailPostInfo.likes}
          phoneNumber={detailPostInfo.phoneNumber}
          uuid={detailPostInfo.uuid}
          viewsCount={detailPostInfo.viewsCount}
          currentUserImageUrl={currentUserImageUrl}
          onSubmitComment={onSubmitComment}
          currenUuid={detailPostInfo.writer.accountUuid}
          onClickLike={onClickLike}
        />
      </form>
      <LoginRequestModal open={loginModalOpen} onClick={handleLoginModalOpen} />
    </>
  ) : (
    <ProgressBlock>
      <CircularProgress />
    </ProgressBlock>
  );
};

const ProgressBlock = styled('div')({
  width: '100%',
  height: '100vh',
  '& .MuiCircularProgress-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transForm: 'translate(-50%,-50%)',
  },
});

export default DetailForm;
