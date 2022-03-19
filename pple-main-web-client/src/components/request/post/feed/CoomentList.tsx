import React, { useCallback, useState } from 'react';
import { IReply } from '../../../../lib/interface/IDetailPost';
import Comment from './Comment'; 
interface reply {
  reply: Array<IReply>;
  currentUuid: string;
  donationUuid: string;
}
const CoomentList: React.FC<reply> = ({ reply, currentUuid,donationUuid }) => {
  return (
    <>
      {reply.map((reply, index) => (
        <Comment
          key={index}
          isOpponent={true}
          name={reply.writer.displayName}
          bloodType={reply.writer.bloodType}
          comment={reply.content}
          time={reply.createdAt}
          profileImageUrl={reply.writer.profileImageUrl}
          commentAccountUuid={reply.writer.accountUuid}
          currentAccountUuid={currentUuid}
          replyUuid={reply.uuid}
          donationUuid={donationUuid}
        />
      ))}
    </>
  );
};

export default CoomentList;
