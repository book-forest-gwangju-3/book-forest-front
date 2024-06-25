import React, { useState } from 'react';

const Ranking = () => {
  // axios 요청 보내서 전체 유저 데이터 받아오기

  // 더미 데이터
  const data = [
    { username: 'userId1', nickname: 'userNickName1', point: 1000, tier: '골드5' },
    { username: 'userId2', nickname: 'userNickName2', point: 1100, tier: '골드5' },
    { username: 'userId3', nickname: 'userNickName3', point: 1200, tier: '골드5' },
    { username: 'userId4', nickname: 'userNickName4', point: 1300, tier: '골드5' },
    { username: 'userId5', nickname: 'userNickName5', point: 1400, tier: '골드5' },
    { username: 'userId6', nickname: 'userNickName6', point: 2000, tier: '골드5' },
    { username: 'userId7', nickname: 'userNickName7', point: 5000, tier: '골드5' },
    { username: 'userId8', nickname: 'userNickName8', point: 5000, tier: '골드5' },
    { username: 'userId9', nickname: 'userNickName9', point: 5000, tier: '골드5' },
    { username: 'userId10', nickname: 'userNickName10', point: 5000, tier: '골드5' },
    { username: 'userId11', nickname: 'userNickName11', point: 5000, tier: '골드5' },
  ];

  const sortedData = data.sort((a, b) => b.point - a.point);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const table = `w-full`
  const th = `font-normal text-xs text-color-17 py-0.5`
  const thRank = `font-normal text-xs text-color-17 w-32 py-0.5`
  const thId = `font-normal text-xs text-color-17 w-36`
  const bdBottom = `border-b border-color-16`
  const ranking = `px-8`
  const item = `border-b border-color-16`
  const textCenter = `text-center`
  const td = `py-3`
  const btn = `px-3 py-2`
  const tierBg = `bg-color-1`

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
            <th className={th}>포인트</th>
            <th className={th}>티어</th>
            <th className={thId}>아이디</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user, index) => {
            const rank = (currentPage - 1) * itemsPerPage + index + 1;
            return (
              <tr key={index} className={item}>
                <td className={`${ranking} ${td}`}>
                  <div className={getBackgroundColor(rank)}>{rank}</div>
                </td>
                <td className={td}>{user.nickname}</td>
                <td className={`${textCenter} ${td}`}>{user.point} p</td>
                <td className={`${textCenter} ${td} ${tierBg}`}>{user.tier}</td>
                <td className={`${textCenter} ${td}`}>{user.username}</td>
              </tr>
            );
          })}
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
