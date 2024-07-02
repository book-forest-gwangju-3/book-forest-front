import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchForm from "../components/SearchForm";

const ReportEditor = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [report, setReport] = useState({
    title: "",
    content: "",
    bookId: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
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
      fetchReport();
    } else {
      setIsEditMode(false);
      setReport({ title: "", content: "", bookId: null });
    }
  }, [id]);

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

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
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("독후감이 성공적으로 수정되었습니다.");
        nav(`/report/${id}`);
      } else {
        const response = await axios.post(
          `http://localhost:8080/book-reviews`,
          {
            bookId: report.bookId,
            title: report.title,
            content: report.content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("독후감이 성공적으로 생성되었습니다.");
        nav("/report");
      }
    } catch (error) {
      console.error("Error submitting report", error);
    }
  };

  const handleBookSelect = (book) => {
    setReport({ ...report, bookId: book.id });
    setSearchTerm(book.title);
  };

  return (
    <div className="flex flex-col rounded-lg text-gray-800 border border-gray-300 p-4 shadow-lg mt-6">
      {!isEditMode && (
        <div>
          <SearchForm
            text="도서 제목을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBookSelect={handleBookSelect}
          />
        </div>
      )}
      <input
        className="h-10 px-5 text-sm rounded-lg border border-gray-300 my-4 outline-none"
        placeholder="제목을 입력해주세요"
        type="text"
        name="title"
        value={report.title || ""}
        onChange={handleChange}
      />
      <textarea
        className="p-5 h-96 border border-gray-300 rounded-lg text-sm outline-none"
        placeholder="내용을 입력해주세요"
        name="content"
        value={report.content || ""}
        onChange={handleChange}
      />
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
