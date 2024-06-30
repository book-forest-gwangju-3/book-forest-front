import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MyBookReview = () => {
  const [bookReviews, setBookReviews] = useState([]);
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
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching book reviews:', error);
        }
      }
    };

    fetchBookReviews();
  }, [token, userId]);

  return (
    <div>
      {bookReviews.length === 0 ? (
        <p>아직 작성한 독후감이 없습니다.</p>
      ) : (
        <ul>
          {bookReviews.map((review) => (
            <li key={review.id}>{review.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookReview;
