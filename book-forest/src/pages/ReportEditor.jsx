import { useParams, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import Button from "../components/Button";
const ReportEditor = () => {
  // 수정, 생성별 로직 추가
  // 도서 검색 로직 추가
  // 수정일땐 작성버튼 수정으로, 이전 독후감 데이터 띄어주기
  // 생성일땐 비어있는 폼 그대로
  const { id } = useParams();
  const nav = useNavigate();
  return (
    <div className="flex flex-col rounded-lg text-gray-800 border border-gray-300 p-4 shadow-lg mt-6">
      <SearchForm text="도서 제목을 입력해주세요" />
      <input
        className="h-10 px-5 text-sm rounded-lg border border-gray-300 my-4 outline-none"
        placeholder="제목을 입력해주세요"
        type="text"
      />
      <textarea
        className="p-5 h-96 border border-gray-300 rounded-lg text-sm outline-none"
        placeholder="내용을 입력해주세요"
      ></textarea>

      <div className="flex justify-end gap-3 mt-3">
        <Button
          onClick={() => nav(-1)}
          text={"취소"}
          color={"bg-gray-300 text-white"}
        />
        <Button text={"작성"} color={"bg-pink-500 text-white"} />
      </div>
    </div>
  );
};
export default ReportEditor;
