import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import Button from "../components/Button";
import axios from "axios";
import { useSelector } from "react-redux";
const ReportEditor = () => {
  // 수정 로직 추가
  // 도서 검색 로직 추가
  const { id } = useParams();
  const nav = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [report, setReport] = useState({ title: "", content: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchReport();
    } else {
      setIsEditMode(false);
      setReport({ title: "", content: "" });
    }
  }, [id]);

  // 수정모드일때 독후감 데이터 불러오기
  const fetchReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/book-reviews/${id}`
      );
      setReport(response.data.bookReview);
    } catch (error) {
      console.error("Error fetching report", error);
    }
  };

  // 유저 입력값 state로 관리
  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  // 생성, 수정
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.patch(
          `http://localhost:8080/book-reviews/${id}`,
          {
            title: report.title,
            content: report.content,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("독후감이 성공적으로 수정되었습니다.");
        nav(`/report/${id}`); // 수정 후 리포트 상세 페이지로 이동
      }
    } catch (error) {
      console.error("Error submitting report", error);
    }
  };

  return (
    <div className="flex flex-col rounded-lg text-gray-800 border border-gray-300 p-4 shadow-lg mt-6">
      {!isEditMode && <SearchForm text="도서 제목을 입력해주세요" />}
      <input
        className="h-10 px-5 text-sm rounded-lg border border-gray-300 my-4 outline-none"
        placeholder="제목을 입력해주세요"
        type="text"
        name="title"
        value={report.title}
        onChange={handleChange}
      />
      <textarea
        className="p-5 h-96 border border-gray-300 rounded-lg text-sm outline-none"
        placeholder="내용을 입력해주세요"
        name="content"
        value={report.content}
        onChange={handleChange}
      >
        {report.content}
      </textarea>

      <div className="flex justify-end gap-3 mt-3">
        <Button
          onClick={() => nav(-1)}
          text={"취소"}
          color={"bg-gray-300 text-white"}
        />
        <Button
          onClick={handleSubmit}
          text={isEditMode ? "수정" : "작성"}
          color={"bg-pink-500 text-white"}
        />
      </div>
    </div>
  );
};
export default ReportEditor;
