import SearchForm from "../../components/SearchForm";
import ReportFilterButton from "./ReportFilterButton";
import ReportListItem from "./ReportListItem";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const report = [
  {
    "book-review-id": 1,
    title: "몰입을 읽고",
    content: "재밌음",
    "created-at": "2024.06.10",
    "updated-at": "2024.06.10",
    book: {
      "book-id": 1,
      title: "몰입",
      cover: "url",
    },
    user: {
      "user-id": 1,
      "profile-image": "url",
      nickname: "지예찬",
    },
  },
  {
    "book-review-id": 2,
    title: "어린왕자을 읽고",
    content: "유치함",
    "created-at": "2024.06.11",
    "updated-at": "2024.06.11",
    book: {
      "book-id": 2,
      title: "어린왕자",
      cover: "url",
    },
    user: {
      "user-id": 2,
      "profile-image": "url",
      nickname: "김가람",
    },
  },
  {
    "book-review-id": 3,
    title: "몰입을 읽고",
    content: "쉽지않음",
    "created-at": "2024.06.13",
    "updated-at": "2024.06.13",
    book: {
      "book-id": 1,
      title: "자바의정석",
      cover: "url",
    },
    user: {
      "user-id": 3,
      "profile-image": "url",
      nickname: "윤하연",
    },
  },
];

const ReportList = () => {
  const nav = useNavigate();
  // 페이징 현재 선택된 페이지 색 바꾸기
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
          {report.map((item) => {
            return <ReportListItem key={item["book-review-id"]} item={item} />;
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
          onClick={() => nav("/report/editor/1")}
          text={"글 작성"}
          color={"bg-pink-500 text-white"}
        />
      </div>
    </div>
  );
};
export default ReportList;
