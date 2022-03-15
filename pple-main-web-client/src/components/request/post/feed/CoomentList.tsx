import React, { useCallback, useState } from 'react';
import Comment from '../../../common/Comment';
import { IReply } from '../../../../lib/interface/IDetailPost';
import { List, AutoSizer } from 'react-virtualized';
import DeleteCommentModal from '../../../common/modal/DeleteCommentModal';

interface reply {
  reply: Array<IReply>;
  currentUuid: string;
}

const CoomentList: React.FC<reply> = ({ reply,currentUuid }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteModalOpen = (
    currenUuid: string,
    replyWriterUuid: string,
  ) => {
    if (currenUuid == replyWriterUuid) {
      setDeleteModalOpen(!deleteModalOpen);
    }
  };
  const rowRenderer = useCallback(
    ({ index, key }) => {
      const comment = reply[index];
      return (
        <>
          <DeleteCommentModal
            open={deleteModalOpen}
            setOpen={setDeleteModalOpen}
            replyUuid={comment.replyUuid}
          />
          <Comment
            key={key}
            isOpponent={true}
            name={comment.writer.displayName}
            bloodType={comment.writer.bloodType}
            comment={comment.content}
            time={comment.createdAt}
            profileImageUrl={comment.writer.profileImageUrl}
            handleDeleteModalOpen={handleDeleteModalOpen}
            currentUuid={currentUuid}
            replyWriterUuid={comment.writer.accountUuid}
          />
        </>
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
            rowHeight={110}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </>
  );
};

export default CoomentList;
