import React, { useCallback } from 'react';
import Comment from '../../../common/Comment';
import { IReply } from '../../../../lib/interface/IDetailPost';
import { List, AutoSizer } from 'react-virtualized';

interface reply {
  reply: Array<IReply>;
}
const CoomentList: React.FC<reply> = ({ reply }) => {
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
            rowHeight={110}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </>
  );
};

export default CoomentList;
