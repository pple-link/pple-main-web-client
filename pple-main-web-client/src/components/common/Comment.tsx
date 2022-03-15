import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import BloodTypeBlock from './BloodTypeBlock';
import dotmenu from '../../static/images/feed/dotmenu.png';
import { createTimeFormatForComment } from '../../lib/util';
import DeleteCommentModal from './modal/DeleteCommentModal';
import ReportCommentModal from './modal/ReportCommentModal';

const OpponentCommentBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const UserCommentBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CommentBubble = styled.div`
  font-family: 'Pretendard Variable';
  /* width: 100%; */
  background: #f4f4f4;
  border-radius: 14px;
  padding: 10px 12px 12px 12px;
  margin-left: 8px;
  & .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & span {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #767676;
  }
  & .comment {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03em;
    color: #767676;
    margin-top: 2px;
  }
`;

const TimeLine = styled.div`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.03em;
  color: #aeaeae;
  margin-left: 16px;
  margin-top: 4px;
  margin-bottom: 15px;
`;

type Props = {
  isOpponent: boolean;
  name: string;
  bloodType: {
    abo: 'A' | 'B' | 'O' | 'AB';
    rh: 'POSITIVE' | 'NEGATIVE';
  };
  comment: string;
  time: string;
  profileImageUrl: string;
  onClick?: any;
  commentAccountUuid: string;
  currentAccountUuid: string;
  replyUuid: string;
  donationUuid: string;
};

const Comment: React.FC<Props> = ({
  isOpponent,
  name,
  bloodType,
  comment,
  time,
  profileImageUrl,
  commentAccountUuid,
  currentAccountUuid,
  replyUuid,
  donationUuid,
}) => {
  const timeLine = createTimeFormatForComment(time);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [reportOpen, setReportOpen] = useState<boolean>(false);

  const handleDeleteOpen = () => {
    if (commentAccountUuid == currentAccountUuid) {
      setDeleteOpen(!deleteOpen);
      return;
    }
    setReportOpen(!reportOpen);
  };
  return (
    <>
      <DeleteCommentModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        replyUuid={replyUuid}
      />
      <ReportCommentModal
        open={reportOpen}
        setOpen={setReportOpen}
        replyUuid={replyUuid}
        accountUuid={commentAccountUuid}
        donationUuid={donationUuid}
      />
      {isOpponent ? (
        <OpponentCommentBlock>
          <Avatar sx={{ height: '40px', width: '40px' }}>
            <img src={profileImageUrl} alt="" width={40} height={40}></img>
          </Avatar>
          <div style={{ width: '100%' }}>
            <CommentBubble>
              <div className="user-info">
                <div style={{ display: 'flex', alignContent: 'center' }}>
                  <span>{name}</span>
                  <BloodTypeBlock bloodType={bloodType} />
                </div>
                <IconButton
                  onClick={handleDeleteOpen}
                  sx={{ padding: '0px', cursor: 'pointer' }}
                >
                  <img src={dotmenu} width={2} height={10} />
                </IconButton>
              </div>
              <div className="comment">{comment}</div>
            </CommentBubble>
            <TimeLine>{timeLine}</TimeLine>
          </div>
        </OpponentCommentBlock>
      ) : (
        <UserCommentBlock>
          <div>
            <CommentBubble>
              <div className="user-info">
                <span>{name}</span>
                <BloodTypeBlock bloodType={bloodType} />
              </div>
              <div className="comment">{comment}</div>
            </CommentBubble>
            <div className="comment-footer">
              <span>{time}</span>
              <button>답글달기</button>
            </div>
          </div>
        </UserCommentBlock>
      )}
    </>
  );
};

export default Comment;
