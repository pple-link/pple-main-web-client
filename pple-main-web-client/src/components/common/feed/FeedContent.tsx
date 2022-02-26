import React from 'react';
import { styled } from '@mui/material';

const FeedContentBlock = styled('div')({
  '& .title': {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '-0.03em',
    color: '#222222',
    margin: '10px 0px',
  },
  '& .content': {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '-0.03em',
    color: '#222222',
    marginBottom: '10px',
  },
});

interface Props {
  title?: string;
  content?: string;
}

const FeedContent: React.FC<Props> = ({ title, content }) => {
  return (
    <FeedContentBlock>
      <div className="title">{title ? title : '내용이 없습니다'}</div>
      <div className="content">
        {content ? <pre>{content}</pre> : `내용이 없습니다.`}
      </div>
    </FeedContentBlock>
  );
};

export default FeedContent;
