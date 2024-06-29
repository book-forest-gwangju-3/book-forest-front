import { useParams, useNavigate } from "react-router-dom";
import { PiHeartStraight } from "react-icons/pi";
import { PiHeartStraightFill } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import Button from "../components/Button";
import ReportReviewItem from "../features/reports/ReportReviewItem";
import axios from "axios";
import { formatDateYMDHM } from "../utils/dateUtils";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PiUserCircleLight } from "react-icons/pi";
import { sortedByDateAsc } from "../utils/dateUtils";
const ReportDetail = () => {
  //
  // 좋아요 기능
  // 좋아요 수 렌더링
  // 좋아요 버튼 토글로 아이콘 바뀌게
  //
  //
  const { id } = useParams(); // 독후감 아이디
  const [report, setReport] = useState(null); // 독후감 정보
  const [isLoading, setIsLoading] = useState(true); // 로딩상태
  const userInfo = useSelector((state) => state.user.userInfo); // 로그인 유저 정보
  const isLogin = useSelector((state) => state.user.isLogin); // 로그인 상태
  const token = useSelector((state) => state.user.token); // 로그인 토큰
  const [commentContent, setCommentContent] = useState(""); // 유저가 입력한 댓글
  const commentInputRef = useRef(null); // 댓글 입력폼 참조
  const nav = useNavigate();
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        let response;
        if (isLogin) {
          response = await axios.get(
            `http://localhost:8080/book-reviews/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await axios.get(
            `http://localhost:8080/book-reviews/${id}`
          );
        }
        setReport(response.data.bookReview);
      } catch (error) {
        console.error("Error fetching report", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id, isLogin, token]);

  // 독후감 삭제
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/book-reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("독후감이 성공적으로 삭제되었습니다.");
      nav("/report"); // 삭제 후 독후감 목록 페이지로 이동
    } catch (error) {
      console.error("Error deleting report", error);
    }
  };

  // 댓글 압룍 상태 관리
  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  // 댓글 생성
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return; // 빈 댓글 방지
    try {
      const response = await axios.post(
        `http://localhost:8080/book-reviews/${id}/comments`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 새 댓글 기존 댓글에 추가해서 바로 추가되는것처럼 보이도록(Optimistic UI Update)
      setReport((prevReport) => ({
        ...prevReport,
        comments: [...prevReport.comments, response.data],
      }));
      // 입력 필드 초기화
      setCommentContent("");
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  // 댓글 수정(Optimistic UI Update)
  const handleCommentUpdate = (updatedComment) => {
    setReport((prevReport) => ({
      ...prevReport,
      comments: prevReport.comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      ),
    }));
  };
  // 댓글 삭제(Optimistic UI Update)
  const handleCommentDelete = (deletedCommentId) => {
    setReport((prevReport) => ({
      ...prevReport,
      comments: prevReport.comments.filter(
        (comment) => comment.id !== deletedCommentId
      ),
    }));
  };

  // 좋아요 토글
  const toggleLike = async () => {
    if (!isLogin) {
      // 비로그인 좋아요 기능 막기
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/book-reviews/${id}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Optimistic UI update
      setReport((prevReport) => ({
        ...prevReport,
        liked: !prevReport.liked,
        likeCount: prevReport.liked
          ? prevReport.likeCount - 1
          : prevReport.likeCount + 1,
      }));
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  // 댓글 아이콘 클릭 시 댓글 입력창 포커스
  const handleCommentClick = () => {
    if (isLogin) {
      commentInputRef.current?.focus();
    } else {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="my-6">
      <div className="flex justify-between">
        <div>
          <Button
            onClick={() => nav("/report")}
            text={"목록"}
            color={"bg-color-17 text-white h-10 text-base"}
          />
        </div>
        {userInfo && report.user.username === userInfo.username && (
          <div className="flex gap-3">
            <Button
              onClick={() => nav(`/report/editor/${report.id}`)}
              text={"수정"}
              color={"bg-color-17 text-white h-10 text-base"}
            />
            <Button
              onClick={handleDelete}
              text={"삭제"}
              color={"bg-color-17 text-white h-10 text-base"}
            />
          </div>
        )}
      </div>
      <main className="flex items-center justify-center">
        <div className="border bg-white mt-3 rounded-2xl p-4 w-full">
          <div className="flex items-center justify-between">
            <div className="gap-3.5 flex items-center">
              <PiUserCircleLight className="object-cover w-10 h-10" />
              <div className="flex flex-col">
                <b className="capitalize">{report.user.username}</b>
                <p className="text-gray-400 text-xs">
                  {formatDateYMDHM(report.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <h1 className="whitespace-pre-wrap mt-7 text-2xl">{report.title}</h1>
          <div className="mt-5 flex gap-2 justify-center border-b pb-4 flex-wrap">
            <p className="text-left">{report.content}</p>
          </div>
          <div className="h-16 border-b flex items-center justify-around">
            <div
              onClick={handleCommentClick}
              className="flex items-center gap-3 cursor-pointer transition transform hover:scale-105 duration-300"
            >
              <GoComment className="text-xl" />
              <div className="text-sm">{report.comments.length} Comments</div>
            </div>
            <div
              onClick={toggleLike}
              className="flex items-center gap-3 cursor-pointer transition transform hover:scale-105 duration-300"
            >
              {report.liked ? (
                <PiHeartStraightFill className="text-xl text-red-500" />
              ) : (
                <PiHeartStraight className="text-xl cursor-pointer" />
              )}

              <div className="text-sm">{report.likeCount} Likes</div>
            </div>
          </div>
          {sortedByDateAsc(report.comments).map((item) => (
            <ReportReviewItem
              key={item.id}
              item={item}
              reportId={id}
              token={token}
              onCommentUpdate={handleCommentUpdate}
              onCommentDelete={handleCommentDelete}
            />
          ))}

          {isLogin && (
            <form
              onSubmit={handleCommentSubmit}
              className="mt-4 flex items-center"
            >
              <div className="ml-2 flex flex-col flex-grow mr-3">
                <input
                  ref={commentInputRef}
                  type="text"
                  className="bg-gray-100 rounded-xl w-full px-4 py-2 text-gray-800 placeholder-gray-500"
                  placeholder="댓글을 작성해주세요"
                  value={commentContent}
                  onChange={handleCommentChange}
                />
              </div>
              <Button
                type="submit"
                text={"작성"}
                color={"bg-pink-500 text-white h-10 text-base"}
              />
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportDetail;
