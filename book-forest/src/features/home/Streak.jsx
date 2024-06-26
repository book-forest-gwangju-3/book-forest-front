import React, { useState } from 'react';

const Streak = () => {
  const data = {
    "2024-06-20": [
      {
        "commit-type": "BookReview",
        "content": "자바스크립트를 읽고..",
        "exp": 100,
      },
      {
        "commit-type": "Read",
        "content": "책제목 - 23page",
        "exp": 20,
      },
      {
        "commit-type": "Read",
        "content": "책제목2 - 31page",
        "exp": 30,
      },
      {
        "commit-type": "Comment",
        "content": "댓글내용",
        "exp": 10,
      },
    ],
    "2024-06-21": [
      {
        "commit-type": "Comment",
        "content": "댓글내용",
        "exp": 10,
      },
    ],
    "2024-06-22": [
      {
        "commit-type": "BookReview",
        "content": "자바스크립트를 읽고..",
        "exp": 100,
      },
      {
        "commit-type": "Read",
        "content": "책제목 - 23page",
        "exp": 20,
      },
    ],
  };

  const commitTypeMap = {
    'Comment': '댓글 작성',
    'BookReview': '독후감 작성',
    'Read': '독서',
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dates = Object.keys(data);
  const totalPages = Math.ceil(dates.length / itemsPerPage);

  const handleClick = (event, pageNum) => {
    event.preventDefault();
    setCurrentPage(pageNum);
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedDates = dates.slice(startIndex, startIndex + itemsPerPage);

    return selectedDates.map(date => (
      <tr key={date}>
        <td colSpan="3">
          <table>
            {data[date].map((activity, index) => (
              <tr key={index}>
                <td>{commitTypeMap[activity['commit-type']]}</td>
                <td>{activity.content}</td>
                <td>+{activity.exp}p</td>
              </tr>
            ))}
          </table>
        </td>
        <td>{date}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>활동 내역</h2>
      <table border="1">
        <thead>
          <tr>
            <th>활동</th>
            <th>내용</th>
            <th>경험치</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={(e) => handleClick(e, index + 1)} disabled={index + 1 === currentPage}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Streak;
