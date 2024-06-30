import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import axios from "axios";

const ReadingModal = ({ book, onClose }) => {
  const token = useSelector((state) => state.user.token);
  const [readStatus, setReadStatus] = useState(null); // 읽은 마지막 페이지
  const [newPage, setNewPage] = useState(""); // 사용자가 입력한 페이지
  const [error, setError] = useState(""); // 오류 메시지를 위한 상태 추가
  const [totalPage, setTotalPage] = useState(null);

  // 읽은 페이지 기록 불러오기
  useEffect(() => {
    const fetchingReadStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/books/${book.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReadStatus(response.data.myReadStatus.lastReadPage);
        setNewPage(response.data.myReadStatus.lastReadPage);
        setTotalPage(response.data.book.page);
      } catch (error) {
        console.error("Error fetching ReadStatus", error);
      }
    };
    fetchingReadStatus();
  }, [token, book.id]);

  // 페이지 입력 처리
  const handlePageChange = (e) => {
    const value = e.target.value;
    setNewPage(value);

    // 유효성 검사
    if (value && parseInt(value) <= readStatus) {
      setError("이전 페이지보다 큰 값을 입력해주세요.");
    } else if (value && parseInt(value) > totalPage) {
      setError(`총 페이지 수(${totalPage})를 초과할 수 없습니다.`);
    } else {
      setError("");
    }
  };

  // 독서 페이지 기록
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 추가 유효성 검사
    if (
      error ||
      !newPage ||
      parseInt(newPage) <= readStatus ||
      parseInt(newPage) > totalPage
    ) {
      setError("유효하지 않은 페이지 번호입니다.");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:8080/books/${book.id}/read`,
        {
          page: newPage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
    } catch (error) {
      console.error("Error ", error);
    }
  };

  // 모달 외부 클릭시 닫기
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">{book.title}</h2>
        <div className="text-center text-gray-600">페이지 수 : {totalPage}</div>
        <div className="mb-6 text-center text-gray-600">
          몇 페이지까지 읽으셨나요?
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-6">
            <div className="text-lg mr-2">{readStatus || 0}</div>
            <div className="text-lg mx-2 ">-</div>
            <input
              type="number"
              value={newPage}
              onChange={handlePageChange}
              className="border border-gray-300 rounded text-lg py-2 w-20 text-center"
            />
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="flex justify-center space-x-3">
            <Button
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              text="취소"
              color="bg-gray-300 text-white"
            />
            <Button
              type="submit"
              text="기록"
              color="bg-pink-400 text-white"
              disabled={!!error || !newPage || parseInt(newPage) <= readStatus}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadingModal;
