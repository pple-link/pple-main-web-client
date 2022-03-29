import React from 'react';
import { styled } from '@mui/material';
import MobileToolbar from '../../common/navigation/MobileToolbar';
import SearchInput from '../../common/input/SearchInput';
import SortingButtonGroup from '../../common/buttons/SortingButtonGroup';
import FeedTemplate from './feed/FeedTemplate';
import { FilterType } from '../../home/CardTemplate';
const RequestPostListBlock = styled('div')({
  padding: '0px 1rem',
});

interface Props {
  filter: FilterType;
  setFilter: any;
  handleEnterWatch: any;
  enterWatch: boolean;
}

const RequestPostList: React.FC<Props> = ({
  children,
  filter,
  setFilter,
  handleEnterWatch,
  enterWatch,
}) => {
  return (
    <>
      <MobileToolbar title="요청 피드" isBack={true} isWrite={true} />
      <RequestPostListBlock>
        <SearchInput
          placeholder="요청을 검색해보세요"
          handleEnterWatch={handleEnterWatch}
          enterWatch={enterWatch}
        />
        <SortingButtonGroup filter={filter} setFilter={setFilter} />
        {children}
      </RequestPostListBlock>
    </>
  );
};

export default RequestPostList;
