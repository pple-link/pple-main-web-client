import React, { useCallback, useState } from 'react';
import Comment from './Comment';
import { IReply } from '../../../../lib/interface/IDetailPost';

interface reply {
  reply: Array<IReply>;
  currentUuid: string;
}
const CoomentList: React.FC<reply> = ({ reply, currentUuid }) => {
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
        />
      ))}
    </>
  );
};

export default CoomentList;
