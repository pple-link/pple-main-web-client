import React from 'react';
import styled2 from 'styled-components';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Comment from '../../common/Comment';
import { InputBase, styled } from '@mui/material';
import { IconButton } from '@mui/material';
import { Paper } from '@mui/material';
import MobileToolbar from '../../common/navigation/MobileToolbar';
import DetailFeedHeader from '../../common/feed/DetailFeedHeader';
import FeedUserInfo from './feed/FeedUserInfo';
import clipboard from '../../../static/images/feed/clipboard.png';
import comments from '../../../static/images/feed/Chat.png';
import sendIcon from '../../../static/images/feed/Send.png';

const RequestPostBlock = styled2.div`
  font-family: Pretandard;
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
  font-style: normal;
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
  justify-content: space-between;
  color: gray;
  margin-top: 25px;
  & .post_content_footer_col {
    display: flex;
    align-items: center;
  }
  & .post_content_footer_state {
    display: flex;
    align-items: center;
    & span {
      margin-left: 5px;
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
`;

const InputCommentBlock = styled2.div`
  padding: 0px 17px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const StyledInput = styled(InputBase)({
  padding: '5px 17px',
  background: '#F4F4F4',
  borderRadius: '100px',
  fontSize: '14px',
});

const DetailPost: React.FC = () => {
  return (
    <RequestPostBlock>
      <MobileToolbar title="요청피드" isBack={true} />
      <DetailFeedHeader bloodType="A+" sort="WHOLE" buttonText="도움주기" />
      <div className="content_top">
        <FeedUserInfo
          nickname="며눅"
          time="20223308"
          imgUrl="http://k.kakaocdn.net/dn/nDWKQ/btrrxYujq3q/DhUNBMn41zpPrNnPJe6EsK/img_640x640.jpg"
        />
        <ClipBoard>
          <img src={clipboard} alt="" width={16} height={16} />
          <span>게시물 복사</span>
        </ClipBoard>
      </div>

      <Title>
        <span>
          너무 급합니다 ㅠㅠ너무 급합니다 ㅠㅠ너무 급합니다 ㅠㅠ너무 급합니다
          ㅠㅠ
        </span>
      </Title>

      <Content>
        아빠가 11월 2일 급성백혈병 재발로 인해 이식을 받으시고 회복중에 장출혈이
        생기면서 매일 혈소판 수혈을 받으시고 계신 상황입니다. <br /> 병원에서
        지정헌혈을 요청하셔서 백방으로 알아보는데 힘든상황입니다.
      </Content>

      <PostState>
        <div className="post_content_footer_col">
          <div className="post_content_footer_state">
            <img src={comments} width={16} height={16} />
            <span>12</span>
          </div>
          <div className="post_content_footer_state">
            <FileUploadOutlinedIcon />
            <div>4</div>
          </div>
        </div>

        <div className="post_content_footer_col">
          <div className="post_content_footer_state">
            <RemoveRedEyeOutlinedIcon />
            <div>24</div>
          </div>
        </div>
      </PostState>

      <DIVIDER />

      <CommentBlock>
        <Comment
          isOpponent={true}
          name="조은경"
          bloodType="B+"
          comment="지인분께 한번 연락드려볼게요 에이호프님"
          time="12분전"
        />
        <Comment
          isOpponent={false}
          name="에이호프"
          bloodType="B+"
          comment="감사합니다"
          time="12분전"
        />
      </CommentBlock>
      <InputCommentBlock>
        <StyledInput sx={{ ml: 1, flex: 1 }} placeholder="댓글을 남겨주세요" />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <img src={sendIcon} width={24} height={24} />
        </IconButton>
      </InputCommentBlock>
    </RequestPostBlock>
  );
};

export default DetailPost;
