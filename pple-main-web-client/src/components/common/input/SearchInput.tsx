import React, { useState } from 'react';
import { styled, Paper, InputBase, IconButton } from '@mui/material';
import palette from '../../../lib/styles/palette';
import searchImg from '../../../static/images/Search.png';
import { FormTextProps } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyWord } from '../../../models/search';
import { RootState } from '../../../models/index';
const SearchInputBlock = styled('div')({
  margin: '20px 0px 10px 0px',
  width: '100%',
  '& .MuiPaper-root': {
    backgroundColor: `${palette.gray[0]}`,
    color: `${palette.gray[1]}`,
    borderRadius: '15px',
    padding: '0.2rem 1rem 0.2rem 0.5rem',
  },
});

const SearchComponentsBox = styled('div')({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
});

interface ISearch {
  placeholder: string;
}

const SearchInput: React.FC<ISearch> = ({ placeholder }) => {
  const dispatch = useDispatch();
  const [keyword, setKeywords] = useState<string>('');
  const onChange = (event: any) => {
    setKeywords(event.target.value);
  };
  const onKeyPress = (event: any) => {
    if (event.key == 'Enter' && keyword.length > 0) {
      dispatch(setKeyWord(keyword));
      setKeywords('');
    }
  };
  return (
    <SearchInputBlock>
      <Paper elevation={0}>
        <SearchComponentsBox>
          <InputBase
            onChange={onChange}
            value={keyword}
            placeholder={placeholder}
            sx={{ ml: 1, flex: 1, fontWeight: 'bold', color: '#B7B7B7' }}
            inputProps={{ 'aria-label': 'search request feed' }}
            onKeyPress={onKeyPress}
          ></InputBase>
          <IconButton
            type="submit"
            sx={{ p: '10px', justifyContent: 'flex-end' }}
            aria-label="search"
          >
            <img src={searchImg} alt="검색 버튼" />
          </IconButton>
        </SearchComponentsBox>
      </Paper>
    </SearchInputBlock>
  );
};

export default SearchInput;
