import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from './../features/page/pageSlice';

const HomeMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    <>
      <h1>홈메인</h1>
    </>
  );
};

export default HomeMain;