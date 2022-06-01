import React, {useCallback, useEffect, useState} from 'react';
import styled2 from 'styled-components';
import { Avatar, ButtonBase, InputBase, Paper, styled } from '@mui/material';
import { IconButton } from '@mui/material';
import MobileToolbar from '../../common/navigation/MobileToolbar';
import DetailFeedHeader from '../../common/feed/DetailFeedHeader';
import FeedUserInfo from './feed/FeedUserInfo';
import ConnectionModal from '../../common/modal/ConnectionModal';
import CoomentList from './feed/CoomentList';
import clipboard from '../../../static/images/feed/clipboard.png';
import comments from '../../../static/images/feed/Chat.png';
import heart from '../../../static/images/feed/heart.png';
import fullheart from '../../../static/images/feed/fullheart.png';
import arrowUp from '../../../static/images/feed/arrow-up.png';
import IDetailPost from '../../../lib/interface/IDetailPost';
import {
    copyUrl,
    createBloodProductString,
    createBloodTypeString, getUserAgent,
} from '../../../lib/util';
import { useDispatch, useSelector } from 'react-redux';
import { setComment } from '../../../models/comment';
import LoginRequestModal from '../../common/modal/LoginRequestModal';
import { RootState } from '../../../models';
import { isMobile } from 'react-device-detect';
import { Like } from '../../../lib/interface/Like';
import { clickHelpButton } from '../../../lib/ampli';
import {getShareUrl} from "../../../lib/api/donation.test";
import {string} from "prop-types";
import {DOWNLOAD_URL, USER_AGENT} from "../../../lib/util/Constant";

const DetailPost: React.FC<IDetailPost> = ({
  bloodProduct,
  patient,
  writer,
  createdAt,
  reply,
  title,
  content,
  likes,
  phoneNumber,
  uuid,
  viewsCount,
  currentUserImageUrl,
  jwt,
  onClickLike,
}) => {
  const dispatch = useDispatch();
  const currentUuid = useSelector((state: RootState) => state.account.uuid);
  const [commentValue, setCommentValue] = useState('');
  const [connectionOpen, setConnectionOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const { bloodType } = patient;
  const { displayName, profileImageUrl } = writer;
  const [storeUrl, setStoreUrl] = useState<string>("");


  // todo : 모바일에서 디버깅 해보기
  const redirectToStore = (): void => {
      window.open(storeUrl)
      return;
  }

  // const handleConnectionOpen = () => {
  //   setConnectionOpen(!connectionOpen);
  //   clickHelpButton();
  // };
  //
  // const handleLoginOpen = () => {
  //   setLoginOpen(!loginOpen);
  // };

  const onChangeCommentValue = (event: any) => {
    setCommentValue(event.target.value);
  };

  const onClickCommentSubmit = () => {
    dispatch(setComment(commentValue));
    setCommentValue('');
  };

  const handleLikeDonation = () => {
    if (jwt) {
      const donationData: Like = {
        donationUuid: uuid,
        likes: likes,
        jwt: jwt,
      };
      onClickLike(donationData);
      return;
    }
    setLoginOpen(!loginOpen);
  };

  const copyDonationUrl = (): void =>{
    getShareUrl(uuid,jwt)
         .then(async res=>{
           const url = await res.data;
           copyUrl(url);
         })
         .catch(err=>{
           alert("URL 복사를 실패했습니다. 관리자에게 문의해주세요");
           console.error(err);
         });
  }

  useEffect(()=>{
      const userAgent: string = getUserAgent();
      switch (userAgent) {
          case  USER_AGENT.IOS :
              setStoreUrl(DOWNLOAD_URL.APPLE)
              break
          case USER_AGENT.ANDROID :
              setStoreUrl(DOWNLOAD_URL.PLAY_STORE)
              break
          default:
              setStoreUrl("http://localhost:3000/post/dcd572d3-1731-45cc-b109-cc0952eadf34")
              break
      }
  },[])

  return (
    <RequestPostBlock>
      <MobileToolbar title="요청피드" isBack={true} />
      <DetailFeedHeader
        onClick={redirectToStore}
        bloodType={createBloodTypeString(bloodType.abo, bloodType.rh)}
        sort={createBloodProductString(bloodProduct)}
        buttonText="도움주기"
      />
      <div className="content_top">
        <FeedUserInfo
          nickname={displayName}
          time={createdAt}
          imgUrl={profileImageUrl}
        />
      </div>

      <Title>
        <span>{title}</span>
      </Title>

      <Content>{content}</Content>

      <PostState>
        <div className="post_content_footer_state">
          <img src={comments} width={16} height={16} />
          <span>{reply.length}개</span>
        </div>

        <div className="post_content_footer_state">
          <img src={likes.length ? fullheart : heart} width={16} height={16} />
          <span>{likes.length}개</span>
        </div>
      </PostState>

      <FunctionButton>
        <StyledButton onClick={handleLikeDonation}>
          <img
            style={{ marginRight: '7px' }}
            src={heart}
            width={16}
            height={16}
          />
          <span>응원하기</span>
        </StyledButton>
        <StyledButton onClick={copyDonationUrl}>
          <img
            style={{ marginRight: '7px' }}
            src={clipboard}
            width={16}
            height={16}
          />
          <span>사연복사</span>
        </StyledButton>
      </FunctionButton>

      <DIVIDER />

      <CommentBlock>
        <CoomentList
          reply={reply}
          currentUuid={currentUuid}
          donationUuid={uuid}
          jwt={jwt}
        />
      </CommentBlock>
      <InputCommentBlock isMobile={isMobile}>
        <Avatar
          src={currentUserImageUrl}
          sx={{ width: '40px', height: '40px', marginRight: '10px' }}
        />
        <Paper
          elevation={0}
          sx={{
            background: '#F9F9F9',
            border: '1px solid #EDEDED',
            borderRadius: '100px',
            width: '100%',
            display: 'flex',
            alignContent: 'center',
          }}
        >
          <StyledInput
            sx={{ ml: 1, flex: 1, width: '100%' }}
            placeholder="댓글을 남겨주세요"
            value={commentValue}
            onChange={onChangeCommentValue}
          />
          <IconButton type="submit" onClick={onClickCommentSubmit}>
            <img src={arrowUp} width={30} height={30} />
          </IconButton>
        </Paper>
      </InputCommentBlock>

      {/*<ConnectionModal*/}
      {/*  open={connectionOpen}*/}
      {/*  handleOpen={handleConnectionOpen}*/}
      {/*  phoneNumber={phoneNumber}*/}
      {/*/>*/}
      {/*<LoginRequestModal open={loginOpen} onClick={handleLoginOpen} />*/}
    </RequestPostBlock>
  );
};

const RequestPostBlock = styled2.div`
  font-family: Pretandard;
  position:relative; 
  overflow: auto;
  margin-bottom: 70px;
  & .content_top {
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled2.div`
  padding: 0px 18px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.03em;
  color: #222222;
  box-sizing: border-box;
`;

const Content = styled2.div`
  margin-top: 15px;
  padding: 0px 18px;
  box-sizing: border-box;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.03em;
  color: #222222;
  white-space: pre-wrap;
  word-break: break-all;
`;

const PostState = styled2.div`
  padding: 18px;
  display: flex;
  align-items: center;
  color: gray;
  margin-top: 25px;
  & .post_content_footer_col {
    display: flex;
    align-items: center;
  }
  & .post_content_footer_state {
    margin-right : 18px;
    display: flex;
    align-items: center;
    & span {
      margin-left: 7px;
      font-size: 15px;
      line-height: 16px;
      letter-spacing: -0.03em;
      color: #b7b7b7;
      transform: translateY(10%);
    }
  }
`;

const FunctionButton = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid #F4F4F4',
});

const StyledButton = styled(ButtonBase)({
  padding: '12px 0px',
  width: '50%',
  cursor: 'pointer',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '16px',
  letterSpacing: '-0.03em',
  color: '#B7B7B7',
});

const DIVIDER = styled2.div`
  background: #f4f4f4;
  height: 9px;
`;

const CommentBlock = styled2.div`
  padding: 0px 17px;
  margin-top: 15px;
  width:100%;
  box-sizing:border-box;
  overflow: auto;
`;

type Detect = {
  isMobile: boolean;
};

const InputCommentBlock = styled('div')<Detect>(({ isMobile }) => ({
  padding: '0px 17px',
  width: isMobile ? '100%' : '28rem',
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  paddingBottom: '10px',
  background: 'white',
}));

const StyledInput = styled(InputBase)({
  padding: '5px 17px',
  fontSize: '14px',
});

export default React.memo(DetailPost);
