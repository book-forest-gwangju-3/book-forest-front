import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchForm from "../components/SearchForm";

const ReportEditor = () => {
  const { id } = useParams(); // 수정모드일 때 사용
  const location = useLocation(); // URL 파라미터 읽기 위해 사용
  const nav = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [report, setReport] = useState({
    title: "",
    content: "",
    bookId: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isBookSelected, setIsBookSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedBookName, setSavedBookName] = useState(""); // 책 상세정보에서 독후감 쓰기 버튼 눌러서 들어올 때 책 제목

  useEffect(() => {
    if (id) {
      // 수정 모드
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
      // 새 독후감 작성 모드
      setIsEditMode(false);
      const params = new URLSearchParams(location.search);
      const bookId = params.get("bookId");
      if (bookId) {
        // BookDetail에서 넘어온 경우
        setReport((prev) => ({ ...prev, bookId: bookId }));
        const fetchBookTitle = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/books/${bookId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setSavedBookName(response.data.book.title);
            console.log(response.data.book.title);
          } catch (error) {
            console.error("Error fetching bookTitle", error);
          }
        };
        fetchBookTitle();
        setIsBookSelected(true);
      } else {
        // 완전히 새로운 독후감 작성(독후감 게시판에서 글 작성 누른 경우)
        setReport({ title: "", content: "", bookId: null });
      }
    }
  }, [id, location, token]);

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
      {!isEditMode && !isBookSelected && (
        <div>
          <SearchForm
            text="도서 제목을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBookSelect={handleBookSelect}
          />
        </div>
      )}
      {isBookSelected && (
        <div className="flex items-center h-10 px-5 text-sm rounded-lg border border-gray-300">
          {savedBookName}
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
