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
      <h1>나의 독후감</h1>
      <MyBookReview />
    </>
  );
};

export default HomeMyReport;
