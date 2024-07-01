import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from './../features/page/pageSlice';
import MyBookReview from '../features/books/MyBookReviews';

const HomeMyReport = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(1));
  }, [dispatch]);

  return (
    <>
      <MyBookReview />
    </>
  );
};

export default HomeMyReport;
