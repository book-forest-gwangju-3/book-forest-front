import React, { useState, useEffect } from 'react';

const Streak = ({ commitData }) => {
  const commitTypeMap = {
    'Comment': '댓글',
    'BookReview': '독후감',
    'Read': '독서',
  };

  const commitTypeColorMap = {
    'Comment': 'bg-color-1 rounded p-1 ml-2.5',
    'BookReview': 'bg-color-26 rounded p-1 ml-2.5',
    'Read': 'bg-color-23 rounded p-1 ml-2.5',
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    setData(commitData || {});
  }, [commitData]);

  const dates = data ? Object.keys(data) : [];
  const totalPages = Math.ceil(dates.length / itemsPerPage);

  const handleClick = (event, pageNum) => {
    event.preventDefault();
    setCurrentPage(pageNum);
  };

  const formatDate = (dateString) => {
    return dateString.replace(/-/g, '.');
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedDates = dates.slice(startIndex, startIndex + itemsPerPage);

    if (selectedDates.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center py-12">
            현재 활동한 내역이 없습니다.
          </td>
        </tr>
      );
    }

    return selectedDates.map(date => (
      <tr key={date} className="border-b border-color-19">
        <td colSpan="3" className="py-1.5">
          <table className="w-full">
            <tbody>
              {data[date].map((activity, index) => (
                <tr key={index}>
                  <td className="w-32 py-2">
                    <span className={`${commitTypeColorMap[activity.commitType]}`}>
                      {commitTypeMap[activity.commitType]}
                    </span>
                  </td>
                  <td>
                    {activity.commitType === 'Comment' 
                      ? `${activity.content}`
                      : null }
                    {activity.commitType === 'BookReview' 
                      ? <a href={`/book-review/${activity.bookReviewId}`} className="text-blue-500 underline">
                          {activity.bookReviewTitle}
                        </a>
                      : null }
                    {activity.commitType === 'Read' 
                      ? `${activity.bookTitle} - ${activity.readPage}page`
                      : null }
                  </td>
                  <td className="w-60 text-center">+ {activity.exp}p</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td className="w-36 text-center text-color-20 py-1.5">{formatDate(date)}</td>
      </tr>
    ));
  };

  const container = `w-full flex flex-col justify-center items-center`;
  const btn = `px-3 py-2`;
  const table = `w-full`;

  return (
    <div className={container}>
      <h2 className="text-3xl mb-8">활동 내역</h2>
      <table className={table}>
        <thead>
          <tr className="text-xs text-color-17 text-center border-b border-color-19 bg-color-1">
            <td className="w-32 py-1 rounded-tl-lg">활동</td>
            <td className="py-1">내용</td>
            <td className="w-60 py-1">경험치</td>
            <td className="w-36 py-1 rounded-tr-lg">날짜</td>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`${btn} ${currentPage === index + 1 ? 'text-black' : 'text-color-17'}`}
            key={index} 
            onClick={(e) => handleClick(e, index + 1)} 
            disabled={index + 1 === currentPage}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Streak;