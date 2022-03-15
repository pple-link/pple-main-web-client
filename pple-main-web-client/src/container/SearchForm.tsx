import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const SearchForm = () => {
  const dispatch = useDispatch();
  const setKeyword = (keyword: string) => {
    dispatch(setKeyword(keyword));
  };
  return <div></div>;
};

export default SearchForm;
