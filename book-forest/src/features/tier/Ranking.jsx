import React, { useState } from 'react';

const Ranking = () => {
  // axios 요청 보내서 전체 유저 데이터 받아오기

  // 더미데이터
  const data = [
    {
      username: 'userId1',
      nickname: 'userNickName1',
      point: 1000,
      tier: '골드5',
    },
    {
      username: 'userId2',
      nickname: 'userNickName2',
      point: 1100,
      tier: '골드5',
    },
    {
      username: 'userId3',
      nickname: 'userNickName3',
      point: 1200,
      tier: '골드5',
    },
    {
      username: 'userId4',
      nickname: 'userNickName4',
      point: 1300,
      tier: '골드5',
    },
    {
      username: 'userId5',
      nickname: 'userNickName5',
      point: 1400,
      tier: '골드5',
    },
    {
      username: 'userId6',
      nickname: 'userNickName6',
      point: 2000,
      tier: '골드5',
    },
    {
      username: 'userId7',
      nickname: 'userNickName7',
      point: 5000,
      tier: '골드5',
    },
    {
      username: 'userId8',
      nickname: 'userNickName8',
      point: 5000,
      tier: '골드5',
    },
    {
      username: 'userId9',
      nickname: 'userNickName9',
      point: 5000,
      tier: '골드5',
    },
    {
      username: 'userId10',
      nickname: 'userNickName10',
      point: 5000,
      tier: '골드5',
    },
    {
      username: 'userId11',
      nickname: 'userNickName11',
      point: 5000,
      tier: '골드5',
    },
  ];

  // 포인트 기준으로 내림차순 정렬
  const sortedData = data.sort((a, b) => b.point - a.point);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>

      <table>
        <thead>
          <tr>
            <th>등수</th>
            <th>닉네임</th>
            <th>아이디</th>
            <th>포인트</th>
            <th>티어</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user, index) => (
            <tr key={index}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{user.nickname}</td>
              <td>{user.username}</td>
              <td>{user.point}</td>
              <td>{user.tier}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
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
