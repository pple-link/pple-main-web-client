import React, { useCallback, useState } from 'react';
import styled2 from 'styled-components';
import { Avatar, InputBase, Paper, styled } from '@mui/material';
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
  createBloodProductString,
  createBloodTypeString,
  onClickCopyUrl,
} from '../../../lib/util';
import { useDispatch, useSelector } from 'react-redux';
import { setComment } from '../../../models/comment';
import LoginRequestModal from '../../common/modal/LoginRequestModal';
import { RootState } from '../../../models';
import { isMobile } from 'react-device-detect';
import DeviceDetect from '../../../lib/interface/DeviceDetect';
import { Like } from '../../../lib/interface/Like';

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

  const handleConnectionOpen = () => {
    setConnectionOpen(!connectionOpen);
  };

  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen);
  };

  const onChangeCommentValue = (event: any) => {
    setCommentValue(event.target.value);
  };

  const onClickCommentSubmit = () => {
    dispatch(setComment(commentValue));
    setCommentValue('');
  };

  const handleLikeDonation = () => {
    const donationData: Like = {
      donationUuid: uuid,
      likes: likes,
      jwt: jwt,
    };
    onClickLike(donationData);
  };
  return (
    <RequestPostBlock>
      <MobileToolbar title="요청피드" isBack={true} />
      <DetailFeedHeader
        onClick={jwt ? handleConnectionOpen : handleLoginOpen}
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
        <ClipBoard onClick={onClickCopyUrl}>
          <img src={clipboard} alt="" width={16} height={16} />
          <span>게시물 복사</span>
        </ClipBoard>
      </div>

      <Title>
        <span>{title}</span>
      </Title>

      <Content>{content}</Content>

      <PostState>
        <div className="post_content_footer_state">
          <img src={comments} width={16} height={16} />
          <span>{reply.length}</span>
        </div>

        <div className="post_content_footer_state" onClick={handleLikeDonation}>
          <img
            style={{ cursor: 'pointer' }}
            src={likes.length ? fullheart : heart}
            width={16}
            height={16}
          />
          <span>{likes.length}</span>
        </div>
      </PostState>

      <DIVIDER />

      <CommentBlock>
        <CoomentList
          reply={reply}
          currentUuid={currentUuid}
          donationUuid={uuid}
        />
      </CommentBlock>
      <InputCommentBlock ismobile={isMobile.valueOf.toString()}>
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

      <ConnectionModal
        open={connectionOpen}
        handleOpen={handleConnectionOpen}
        phoneNumber={phoneNumber}
      />
      <LoginRequestModal open={loginOpen} onClick={handleLoginOpen} />
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

const ClipBoard = styled2.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 15.6px;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #b7b7b7;
  cursor: pointer;
  & span {
    margin-left: 5px;
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

const InputCommentBlock = styled('div')<DeviceDetect>(({ ismobile }) => ({
  padding: '0px 17px',
  width: ismobile == 'true' ? '100%' : '28rem',
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
