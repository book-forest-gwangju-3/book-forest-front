import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from './../store/pageSlice';

const HomeMyReport = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch]);

  return (
    <>
      <h1>나의 독후감</h1>
    </>
  );
};

export default HomeMyReport;
