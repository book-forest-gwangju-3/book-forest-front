import { useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
const BookDetail = () => {
  // 상태에 따라서 책 읽기, 읽는 중, 읽음 버튼 다르게
  // 평점 입력 할지말지 다시 고민
  // 독후감 쓰기 입력시 이동
  const nav = useNavigate();
  const { id } = useParams();
  return (
    <main className="h-full w-full">
      <Button
        onClick={() => nav(-1)}
        text={"목록"}
        color={"bg-gray-200 my-3 h-10"}
      />
      <div className="border bg-white rounded-2xl p-6">
        <div className="flex items-center gap-10 mt-3">
          <img src={img1} />
          <div className="gap-3.5 flex items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl mb-3">책 제목</h1>
              <p className="text-gray-500 text-md">작가 : 최재원</p>
              <p className="text-gray-500 text-md">출간일 : 24.03.22</p>
              <p className="text-gray-500 text-md">페이지 수 : 502</p>
              <p className="text-gray-500 text-md">출판사 : 싸피</p>
              <p className="text-gray-500 text-md">가격 : 33200 </p>
              <p className="text-gray-500 text-md">카테고리</p>
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-2 justify-center border-b pb-4 flex-wrap">
          <p>
            컬트 내부에서는 무슨 일이 벌어지는가 컬트 집단을 외부에서 바라보면
            그저 기괴할 뿐이다. 컬트 지도자의 궤변과 권능, 집단 문화의 폭력성과
            비인간성, 추종자의 비논리적 믿음, 모든 것이 총체적으로 얽혀 거대한
            거짓말 같아 보인다. 그러나 집단 광기는 현재 우리의 현실 안에도
            모세혈관처럼 퍼져있다. 이 작은 나라에서 최근 몇 년 사이에 화제 된
            사이비 종교의 이름만 몇 개인지. 혼란한 현실을 구체적으로 살펴보는
            데에 이 책이 도움 될 수 있을 것 같다. 사람들은 왜 컬트에 빠질까. 그
            내부에서는 실제로 무슨 일이 벌어질까? 이 책은 전 세계의 이목을
            집중시킨 악명 높고 기괴한 컬트 집단에 대해 얘기한다.
          </p>
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
            <div className="text-sm">10 Comments</div>
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
