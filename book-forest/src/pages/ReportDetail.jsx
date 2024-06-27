import { useParams } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";
import { PiHeartStraight } from "react-icons/pi";
import { PiHeartStraightFill } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import Button from "../components/Button";
import axios from "axios";
import { formatDateYMDHM } from "../utils/dateUtils";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLogin = useSelector((state) => state.user.isLogin);
  const fetchReport = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/book-reviews/${id}`
      );
      setReport(response.data.bookReview);
      console.log(response.data.bookReview);
    } catch (error) {
      console.error("Error fetching report", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchReport();
  }, [fetchReport]);
  // params에 해당하는 독후감 데이터 가져오는 로직 추가
  // 로그인시 댓글 작성가능, 비로그인시 불가능
  // 로그인유저 === 작성자면 수정, 삭제 버튼
  // 시간 변환하는 함수 추가
  // 좋아요 버튼 토글로 아이콘 바뀌게
  // 댓글 수 렌더링
  // 자기가 쓴 댓글에는 수정, 삭제 버튼
  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="flex items-center justify-center">
      {userInfo && report.user.username === userInfo.username && (
        <button>삭제</button>
      )}
      <div className="border bg-white mt-6 rounded-2xl p-4 w-full">
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
          <div className="flex items-center gap-3">
            <GoComment className="text-xl" />
            <div className="text-sm">10 Comments</div>
          </div>
          <div className="flex items-center gap-3">
            <PiHeartStraight className="text-xl" />
            <div className="text-sm">5 Likes</div>
          </div>
        </div>
        <div className="pt-4">
          <div className="mb-4 flex">
            <PiUserCircleLight className="w-10 h-10" />
            <div className="ml-2 flex flex-col">
              <b className="capitalize">최재원</b>
              <time dateTime="06-08-21" className="text-gray-400 text-xs">
                24.06.23 12:04
              </time>
              <p className="whitespace-pre-wrap mt-2">잘 읽었습니다.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="ml-2 flex flex-col flex-grow mr-3">
            <input
              type="text"
              className="bg-gray-100 rounded-xl w-full px-4 py-2 text-gray-800 placeholder-gray-500"
              placeholder="댓글을 작성해주세요"
            />
          </div>
          <Button
            text={"작성"}
            color={"bg-pink-500 text-white h-10 text-base"}
          />
        </div>
      </div>
    </main>
  );
};

export default ReportDetail;
