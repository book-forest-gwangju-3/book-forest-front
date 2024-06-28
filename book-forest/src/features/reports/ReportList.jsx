import SearchForm from "../../components/SearchForm";
import ReportFilterButton from "./ReportFilterButton";
import ReportListItem from "./ReportListItem";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { sortedByDateDesc } from "../../utils/dateUtils";

const ReportList = () => {
  const [reports, setReports] = useState([]); // 독후감 목록
  const [searchTerm, setSearchTerm] = useState(""); // 독후감 검색어
  const [searchedReports, setSearchedReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 페이징
  const [reportsPerPage] = useState(10); // 한 페이지당 보여줄 독후감 수
  const nav = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []); // 마운트 될때만 실행

  useEffect(() => {
    const searched = reports.filter(
      (report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedReports(searched);
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  }, [searchTerm, reports]);

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

  // 페이징
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = searchedReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  // 페이지 수 계산
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(searchedReports.length / reportsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <SearchForm
          text={"검색어를 입력해주세요"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
          {currentReports.map((item) => (
            <ReportListItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      <div className="flex">
        {/* 페이지네이션 */}
        <div className={paginationWrapperClass}>
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            className={paginationButtonClass}
          >
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <p
              key={number}
              className={`${paginationNumberClass} ${
                currentPage === number ? "text-blue-500" : ""
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </p>
          ))}
          <button
            onClick={() =>
              paginate(
                currentPage < pageNumbers.length
                  ? currentPage + 1
                  : pageNumbers.length
              )
            }
            className={paginationButtonClass}
          >
            &gt;
          </button>
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
