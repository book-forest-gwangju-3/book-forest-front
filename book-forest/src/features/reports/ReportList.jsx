import SearchForm from "../../components/SearchForm";
import ReportFilterButton from "./ReportFilterButton";
import ReportListItem from "./ReportListItem";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { sortedByDateDesc } from "../../utils/dateUtils";
const ReportList = () => {
  const [reports, setReports] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    fetchReports();
  }, []); // 마운트 될때만 실행

  // 독후감 목록 불러오는 함수
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:8080/book-reviews");
      const sortedReports = sortedByDateDesc(response.data.bookReviews); // 최신순으로 정렬
      setReports(sortedReports);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  // tailwind
  const containerClass = "my-10";
  const inputFilterWrapperClass = "flex gap-4";
  const tableWrapperClass = "table-auto border-collapse w-full my-5";
  const tableHeadClass =
    "rounded-lg text-sm font-medium text-gray-700 text-center bg-gray-200";
  const tableHeadTitleClass = "px-4 py-2";
  const tableHeadWriterClass = "px-4 py-2 w-1/5";
  const tableHeadDateClass = "px-4 py-2 w-1/5";
  const tableBodyWrapperClass = "text-sm text-gray-700";
  const paginationWrapperClass =
    "w-full flex justify-center border-gray-100 items-center";
  const paginationButtonClass =
    "w-5 h-5 text-sm text-center hover:text-blue-500";
  const paginationNumberClass =
    "cursor-pointer mx-2 text-sm hover:text-blue-500";
  return (
    <div className={containerClass}>
      {/* 검색폼 */}
      <div className={inputFilterWrapperClass}>
        <SearchForm text={"검색어를 입력해주세요"} />
        {/* 필터 */}
        <ReportFilterButton />
      </div>

      {/* 테이블 */}
      <table className={tableWrapperClass}>
        <thead>
          <tr className={tableHeadClass}>
            <th className={tableHeadTitleClass}>제목</th>
            <th className={tableHeadWriterClass}>글쓴이</th>
            <th className={tableHeadDateClass}>작성일</th>
          </tr>
        </thead>
        <tbody className={tableBodyWrapperClass}>
          {reports.map((item) => {
            return <ReportListItem key={item.id} item={item} />;
          })}
        </tbody>
      </table>
      <div className="flex">
        {/* 페이지네이션 */}
        <div className={paginationWrapperClass}>
          <button className={paginationButtonClass}>&lt;</button>
          <p className={paginationNumberClass}>1</p>
          <p className={paginationNumberClass}>2</p>
          <p className={paginationNumberClass}>3</p>
          <p className={paginationNumberClass}>4</p>
          <p className={paginationNumberClass}>5</p>
          <button className={paginationButtonClass}>&gt;</button>
        </div>
        <Button
          onClick={() => nav("/report/editor")}
          text={"글 작성"}
          color={"bg-pink-500 text-white"}
        />
      </div>
    </div>
  );
};
export default ReportList;
