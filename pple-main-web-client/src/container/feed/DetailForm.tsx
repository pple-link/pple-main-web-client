import { CircularProgress, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailPost from '../../components/request/post/DetailPost';
import { getAccountProfile } from '../../lib/api/account';
import { getOneDonation } from '../../lib/api/donation';
import { getCookie } from '../../lib/hooks/CookieUtil';
import IDetailPost from '../../lib/interface/IDetailPost';

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

const DetailForm: React.FC = () => {
  const param = useParams();
  const donationUuid = param.donationUuid;
  const [detailPostInfo, setDetailPostInfo] = useState<IDetailPost>();
  const jwt = getCookie();
  const [currentUserImageUrl, setCurrentUserImageUrl] = useState<string>('');
  useEffect(() => {
    if (jwt) {
      getAccountProfile(jwt).then(res => {
        setCurrentUserImageUrl(res.data.profileImageUrl);
      });
    }
    getOneDonation(donationUuid).then(res => {
      setDetailPostInfo(res.data);
    });
  }, []);

  return detailPostInfo ? (
    <>
      <DetailPost
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
      />
    </>
  ) : (
    <ProgressBlock>
      <CircularProgress />
    </ProgressBlock>
  );
};

export default DetailForm;
