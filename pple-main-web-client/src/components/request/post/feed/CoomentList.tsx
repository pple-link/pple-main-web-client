import React, { useCallback, useState } from 'react';
import Comment from '../../../common/Comment';
import { IReply } from '../../../../lib/interface/IDetailPost';
import { List, AutoSizer } from 'react-virtualized';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../models';
import { deleteComment } from '../../../../lib/api/comment';
import DeleteCommentModal from '../../../common/modal/DeleteCommentModal';
import ReportCommentModal from '../../../common/modal/ReportCommentModal';


interface reply {
  reply: Array<IReply>;
  currentUuid: string;
}
const CoomentList: React.FC<reply> = ({ reply, currentUuid }) => {
  

  const rowRenderer = useCallback(
    ({ index, key }) => {
      const comment = reply[index];

      return (
        <Comment
          key={key}
          isOpponent={true}
          name={comment.writer.displayName}
          bloodType={comment.writer.bloodType}
          comment={comment.content}
          time={comment.createdAt}
          profileImageUrl={comment.writer.profileImageUrl}
          commentAccountUuid={comment.writer.accountUuid}
          currentAccountUuid={currentUuid}
          replyUuid={comment.uuid}
        />

      );
    },
    [reply],
  );
  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <List
            list={reply}
            width={width}
            height={height}
            rowCount={reply.length}
            rowHeight={108}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </>
  );
};

export default CoomentList;
