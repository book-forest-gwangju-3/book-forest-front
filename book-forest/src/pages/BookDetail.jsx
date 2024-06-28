import { PiUserCircleLight } from "react-icons/pi";
import { PiHeartStraight } from "react-icons/pi";
import { PiHeartStraightFill } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import { PiBookLight } from "react-icons/pi"; // 읽기 전
import { PiBookOpen } from "react-icons/pi"; // 읽는 중
import { PiBookFill } from "react-icons/pi"; // 읽은 후
import { PiPencilSimpleLine } from "react-icons/pi";
import Button from "../components/Button";
import img1 from "../assets/img/image1.png";
import { resolvePath, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const BookDetail = () => {
  // 상태에 따라서 책 읽기, 읽는 중, 읽음 버튼 다르게
  // 평점 입력 할지말지 다시 고민
  // 독후감 쓰기 입력시 이동
  const nav = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState();
  const [isLoading, setIsLoading] = useState(null);
  const isLogin = useSelector((state) => state.user.isLogin); // 로그인 상태
  const token = useSelector((state) => state.user.token); // 로그인 토큰
  const userInfo = useSelector((state) => state.user.userInfo); // 로그인 유저 정보

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        let response;
        if (isLogin) {
          // 로그인 상태: 헤더에 토큰 넣어서 get 요청
          response = await axios.get(`http://localhost:8080/books/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          // 로그아웃 상태 : 그냥 get요청
          response = await axios.get(`http://localhost:8080/books/${id}`);
        }
        setBook(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching book", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id, isLogin, token]);
  if (isLoading || !book) return <div>Loading...</div>;
  return (
    <main className="h-full w-full">
      <Button
        onClick={() => nav(-1)}
        text={"목록"}
        color={"bg-gray-200 my-3 h-10"}
      />
      <div className="border bg-white rounded-2xl p-6">
        <div className="flex items-center gap-10 mt-3">
          <img src={book.book.coverUrl} />
          <div className="gap-3.5 flex items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl mb-3">{book.book.title}</h1>
              <p className="text-gray-500 text-md">작가 : {book.book.author}</p>
              <p className="text-gray-500 text-md">
                출간일 : {book.book.pubDate}
              </p>
              <p className="text-gray-500 text-md">
                총 페이지 수 : {book.book.page}
              </p>
              <p className="text-gray-500 text-md">
                출판사 : {book.book.publisher}
              </p>
              <p className="text-gray-500 text-md">
                가격 : {book.book.standardPrice}
              </p>
              <p className="text-gray-500 text-md">{book.book.categoryName}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-2 justify-center border-b pb-4 flex-wrap">
          <p>{book.book.description}</p>
        </div>
        <div className="h-16 border-b flex items-center justify-around gap-6">
          <div className="flex items-center gap-3 cursor-pointer transition transform hover:scale-105 duration-300">
            <PiBookLight className="text-xl" />
            <div className="text-sm">책 읽기</div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition transform hover:scale-105 duration-300">
            <PiPencilSimpleLine className="text-xl" />
            <div className="text-sm">독후감 쓰기</div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition transform hover:scale-105 duration-300">
            <GoComment className="text-xl" />
            <div className="text-sm">{book.quickReviews.length} Comments</div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition transform hover:scale-105 duration-300">
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
export default BookDetail;
