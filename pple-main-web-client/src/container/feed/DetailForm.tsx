import {CircularProgress, styled} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import DetailPost from '../../components/request/post/DetailPost';
import {getAccountProfile} from '../../lib/api/account';
import {saveComment} from '../../lib/api/comment';
import {getOneDonation} from '../../lib/api/donation';
import {getCookie} from '../../lib/hooks/CookieUtil';
import IDetailPost from '../../lib/interface/IDetailPost';
import {RootState} from '../../models';
import LoginRequestModal from '../../components/common/modal/LoginRequestModal';
import {Like} from '../../lib/interface/Like';
import {likeDonation} from '../../lib/api/like';
import {showDetailPost} from '../../lib/ampli';
import amplitude from 'amplitude-js';
import {getOneDonationByEncodedParameter} from "../../lib/api/donation.test";
import {errorNoExistDonation} from "../../lib/util/error";
import {getUserAgent} from "../../lib/util";
import {DOWNLOAD_URL, USER_AGENT} from "../../lib/util/Constant";

const DetailForm: React.FC = () => {
    // const jwt = getCookie();
    const param = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const donationUuid = param.donationUuid;
    const [detailPostInfo, setDetailPostInfo] = useState<IDetailPost>();
    const [currentUserImageUrl, setCurrentUserImageUrl] = useState<string>('');
    const [submitCheck, setSubmitCheck] = useState<boolean>(false);
    const [likeCheck, setLikeCheck] = useState<boolean>(false);
    const [userAgent, setUserAgent] = useState<string>("");


    const redirectToStore = (): void => {
        switch (userAgent) {
            case USER_AGENT.ANDROID:
                window.open(DOWNLOAD_URL.PLAY_STORE)
                break;
            case USER_AGENT.IOS:
                window.open(DOWNLOAD_URL.APPLE)
                break;
            default:
                window.open(DOWNLOAD_URL.APPLE)
                break;
        }
    }

    // const onSubmitComment = (event: any) => {
    //   event.preventDefault();
    //   if (!jwt) {
    //     handleLoginModalOpen();
    //     return;
    //   }
    //   if (commentValue.length > 300) {
    //     alert('300자 이하로 작성해주세요!');
    //     return;
    //   }
    //   if (commentValue) {
    //     setSubmitCheck(!submitCheck);
    //     saveComment(jwt, { content: commentValue, donationUuid }).catch(err => {
    //       console.log(err);
    //     });
    //   }
    // };

    useEffect(() => {
        amplitude.getInstance().init(`${process.env.REACT_APP_AMPLITUDE_API}`);
        showDetailPost();
        const os = getUserAgent();
        setUserAgent(os);
        // if (jwt && firstCall) {
        //   setFirstCall(!firstCall);
        //   getAccountProfile(jwt).then(res => {
        //     setCurrentUserImageUrl(res.data.profileImageUrl);
        //   });
        // }
        if (donationUuid.length > 14) {
            getOneDonation(donationUuid)
                .then(res => {
                    console.log(res);
                    setDetailPostInfo(res.data);
                })
                .catch(err => {
                    errorNoExistDonation(navigate);
                });
        } else {
            const a = searchParams.get('a');
            const d = searchParams.get('d');
            getOneDonationByEncodedParameter(donationUuid,a,d)
                .then(res => {
                    console.log(res);
                    setDetailPostInfo(res.data);
                })
                .catch(err => {
                    errorNoExistDonation(navigate);
                });
        }

    }, [submitCheck, likeCheck]);

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
                currenUuid={detailPostInfo.writer.accountUuid}
                onClickLike={redirectToStore}
            />
        </>
    ) : (
        <ProgressBlock>
            <CircularProgress/>
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
