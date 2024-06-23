import SearchForm from "../../components/SearchForm";
import ReportFilterButton from "./ReportFilterButton";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
const ReportsList = () => {
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
  const tableBodyClass =
    "hover:bg-gray-100 border-b border-gray-200 text-center";
  const tableBodyTitleClass = "px-4 py-4 text-left cursor-pointer";
  const tableBodyWriterClass = "px-4 py-4";
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
          <tr className={tableBodyClass}>
            <td className={tableBodyTitleClass}>몰입을 읽고</td>
            <td className={tableBodyWriterClass}>지예찬</td>
            <td className={tableBodyWrapperClass}>24.06.23</td>
          </tr>
          <tr className={tableBodyClass}>
            <td className={tableBodyTitleClass}>ㄱㄱㄱㄱ</td>
            <td className={tableBodyWriterClass}>윤하연</td>
            <td className={tableBodyWrapperClass}>24.06.22</td>
          </tr>
          <tr className={tableBodyClass}>
            <td className={tableBodyTitleClass}>들어와봐요</td>
            <td className={tableBodyWriterClass}>김가람</td>
            <td className={tableBodyWrapperClass}>24.06.20</td>
          </tr>
          <tr className={tableBodyClass}>
            <td className={tableBodyTitleClass}>읽어주세요</td>
            <td className={tableBodyWriterClass}>최재원</td>
            <td className={tableBodyWrapperClass}>24.06.20</td>
          </tr>
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
export default ReportsList;
