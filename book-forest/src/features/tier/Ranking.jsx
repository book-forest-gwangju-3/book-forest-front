import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ranking = () => {
  // 전체 유저 데이터 받아오기
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchBookReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/ranking`);
        setRankings(response.data);
      } catch (error) {
        console.error('Error fetching book reviews:', error);
      }
    };

    fetchBookReviews();
  }, []);

  const sortedData = rankings.sort((a, b) => b.exp - a.exp);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRank = (index) => {
    if (index === 0) return 1;
    const prevUser = sortedData[index - 1];
    const currentUser = sortedData[index];
    if (prevUser.exp === currentUser.exp) return getRank(index - 1);
    return index + 1;
  };

  const table = `w-full`;
  const th = `font-normal text-xs text-color-17 py-0.5`;
  const thTier = `font-normal text-xs text-color-17 py-0.5 w-48`;
  const thPoint = `font-normal text-xs text-color-17 py-0.5 w-56`;
  const thRank = `font-normal text-xs text-color-17 w-32 py-0.5`;
  const thId = `font-normal text-xs text-color-17 w-36`;
  const bdBottom = `border-b border-color-16`;
  const ranking = `px-8`;
  const item = `border-b border-color-16`;
  const textCenter = `text-center`;
  const td = `py-3`;
  const btn = `px-3 py-2`;
  const tierBg = `bg-color-1`;

  const getBackgroundColor = (rank) => {
    if (rank === 1) return 'bg-color-11 w-6 rounded flex justify-center items-center flex-wrap ml-5';
    if (rank === 2) return 'bg-color-24 w-6 rounded flex justify-center items-center flex-wrap ml-5';
    if (rank === 3) return 'bg-color-25 w-6 rounded flex justify-center items-center flex-wrap ml-5 text-white';
    return 'text-center';
  };

  return (
    <>
      <table className={table}>
        <thead>
          <tr className={bdBottom}>
            <th className={thRank}>등수</th>
            <th className={th}>닉네임</th>
            <th className={thPoint}>포인트</th>
            <th className={thTier}>티어</th>
            <th className={thId}>아이디</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="5" className={`${textCenter} ${td} pt-12`}>현재 등록된 유저가 없습니다</td>
            </tr>
          ) : (
            currentData.map((user, index) => {
              const rank = getRank((currentPage - 1) * itemsPerPage + index);
              return (
                <tr key={index} className={item}>
                  <td className={`${ranking} ${td}`}>
                    <div className={getBackgroundColor(rank)}>{rank}</div>
                  </td>
                  <td className={td}>{user.nickname}</td>
                  <td className={`${textCenter} ${td}`}>{user.exp} p</td>
                  <td className={`${textCenter} ${td} ${tierBg}`}>{user.tierName}</td>
                  <td className={`${textCenter} ${td}`}>{user.username}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`${btn} ${currentPage === index + 1 ? 'text-black' : 'text-color-17'}`}
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <hr />
    </>
  );
};

export default Ranking;
