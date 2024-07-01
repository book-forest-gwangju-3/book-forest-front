import MyReportCard from "./../../components/MyReportCard";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyBookReview = () => {
  const [bookReviews, setBookReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userInfo.id);

  useEffect(() => {
    const fetchBookReviews = async () => {
      if (token && userId) {
        try {
          const response = await axios.get(`http://localhost:8080/user/${userId}/book-reviews`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBookReviews(response.data.bookReviews);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching book reviews:', error);
        }
      }
    };

    fetchBookReviews();
  }, [token, userId]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(bookReviews.length / itemsPerPage);
    return (
      <div className="flex justify-center">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-2 mb-6 ${currentPage === index + 1 ? 'text-black' : 'text-color-17'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  const currentItems = bookReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {currentItems.length === 0 ? (
        <p className="mt-12 text-center">아직 작성한 독후감이 없습니다.</p>
      ) : (
        currentItems.map((item) => (
          <MyReportCard
            item={item}
            key={item.id}
          />
        ))
      )}
      {renderPagination()}
    </div>
  );
};

export default MyBookReview;
