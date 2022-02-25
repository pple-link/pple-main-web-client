import React, { useEffect, useState } from 'react';
import { getOwnDonations } from '../../lib/api/donation';
import MyStory from '../../components/mypage/my-story/MyStory';
import StoryBubble from '../../components/mypage/my-story/StoryBubble';
import { customAxios } from '../../lib/customAxios';
import { getCookie } from '../../lib/hooks/CookieUtil';

export type ContentType = {
  bloodProduct: Array<string>;
  content: string;
  createdAt: string;
  createdBy: number;
  lastRenewedAt: string;
  modifiedAt: string;
  modifiedBy: number;
  patient: {
    blood: {
      abo: string;
      rh: string;
    };
  };
  writer: {
    blood: {
      abo: string;
      rh: string;
    };
    displayName: string;
    profileImageUrl: string;
    uuid: string;
  };
  phoneNumber: string;
  renewedCount: number;
  status: string;
  title: string;
  uuid: string;
};
const MyStoryForm = () => {
  const jwt = getCookie();
  const [content, setContent] = useState<Array<ContentType>>([]);

  useEffect(() => {
    getOwnDonations(jwt)
      .then(async res => {
        const newContent = [];
        await res.data.content.map(story => {
          if (story.status == 'ACTIVE') {
            newContent.push(story);
          }
        });
        setContent(newContent);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <MyStory>
      {content.length != 0 ? (
        content.map((con: ContentType, index) => (
          <StoryBubble key={index} index={index} content={con} />
        ))
      ) : (
        <div>등록된 게시글이 없습니다</div>
      )}
    </MyStory>
  );
};

export default MyStoryForm;
