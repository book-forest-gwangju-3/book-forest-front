import { useState } from "react";
import { LuSprout } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
// count로 받아오는 독후감 수 1개 이상이면 새싹 아이콘 출력
// total-page-count에 따라 잔디밭 색상 바꿔야함
// 하단 커밋 설명도 수정
// 연속 스트릭 표시해도될듯

const commitData = [
  { date: "2024-06-24", count: 1, review: 1 },
  { date: "2024-06-23", count: 4 },
  { date: "2024-06-22", count: 5 },
  { date: "2024-06-21", count: 5, review: 1 },
  { date: "2024-06-20", count: 2 },
  { date: "2024-05-30", count: 0 },
  { date: "2024-05-29", count: 1 },
  { date: "2024-05-28", count: 2 },
  { date: "2024-05-27", count: 3 },
  { date: "2024-05-26", count: 2 },
  { date: "2024-05-25", count: 4 },
  { date: "2024-05-24", count: 1 },
  { date: "2024-05-23", count: 2 },
  { date: "2024-05-22", count: 5 },
  { date: "2024-05-21", count: 3 },
  { date: "2024-05-20", count: 5 },
  { date: "2024-04-30", count: 0 },
  { date: "2024-04-29", count: 1 },
  { date: "2024-04-28", count: 0 },
  { date: "2024-04-27", count: 1 },
  { date: "2024-04-26", count: 2 },
  { date: "2024-04-25", count: 3 },
  { date: "2024-04-24", count: 4 },
  { date: "2024-04-23", count: 2 },
  { date: "2024-04-22", count: 1 },
  { date: "2024-04-21", count: 3 },
  { date: "2024-04-20", count: 5 },
  { date: "2024-03-31", count: 0 },
  { date: "2024-03-30", count: 1 },
  { date: "2024-03-29", count: 2 },
  { date: "2024-03-28", count: 3 },
  { date: "2024-03-27", count: 2 },
  { date: "2024-03-26", count: 4 },
  { date: "2024-03-25", count: 1 },
  { date: "2024-03-24", count: 1 },
];

const Heatmap = () => {
  const nav = useNavigate();
  const [filter, setFilter] = useState(3); // 필터값 상태 관리
  const filterChange = (e) => {
    setFilter(Number(e.target.value));
  };
  // 최근 3달 기간의 날짜 목록 생성
  const today = new Date(); // 오늘 날짜
  const threeMonthsAgo = new Date( // 3달전 날짜
    today.getFullYear(), // 현재 연도
    today.getMonth() - filter, // 현재 월 기준으로 3달 전
    today.getDate() // 현재 날짜
  );
  const dateRange = [];
  for (
    let date = threeMonthsAgo;
    date <= today;
    date.setDate(date.getDate() + 1) // date를 계속 증가시키면서 date가 오늘 날짜랑 같을때까지만 반복되도록
  ) {
    dateRange.push(date.toISOString().split("T")[0]);
    // 어떤 형식으로 받을지 아직 몰라서
    // ISO형식(YYYY-MM-DDTHH:mm)으로 변환하고 T기준으로 분리해서 앞의 날짜만 받고
    // dateRange에 추가
  }

  // commitData에 없는 날짜 처리
  const filteredData = dateRange.map((date) => {
    const existingData = commitData.find((item) => item.date === date);
    return existingData || { date, count: 0 };
    // 만약 commitData에 해당 날짜가 없으면, {date, count:0} 객체를 반환해서 빈칸 만들기
  });

  // 색상 결정 함수
  const getColor = (count) => {
    if (count > 4) return "bg-green-800";
    if (count > 2) return "bg-green-600";
    if (count > 0) return "bg-green-300";
    return "bg-gray-200";
  };

  // 툴팁 상태 관리
  const [tooltip, setTooltip] = useState(null);

  // 툴팁 열기
  const handleMouseEnter = (date) => {
    setTooltip(date);
    // 마우스올렸을때 날짜 넣어줘야 해당 날짜의 툴팁만 나오게 할 수 있음
  };

  // 툴팁 닫기
  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <section>
      <div className="flex justify-between text-right mr-4">
        <div className="flex items-center">
          <SectionTitle text={"스트릭"} />
          <div
            onClick={() => nav("/streak")}
            className="ml-4 text-gray-400 cursor-pointer hover:scale-110"
          >
            + 상세
          </div>
        </div>
        <select
          value={filter}
          onChange={filterChange}
          className="cursor-pointer hover:scale-105"
        >
          <option value="3">최근 3개월</option>
          <option value="6">최근 6개월</option>
        </select>
      </div>
      <div className="flex flex-wrap my-4 gap-1">
        {filteredData.map((commit, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex justify-center items-center relative rounded-md transition-transform hover:border-2 hover:border-blue-700 ${getColor(
              commit.count
            )}`}
            onMouseEnter={() => handleMouseEnter(commit.date)}
            onMouseLeave={handleMouseLeave}
          >
            {commit.review >= 1 && (
              <LuSprout className="text-green-500 w-6 h-6" />
            )}
            {tooltip === commit.date && (
              <div className="absolute top-12 -right-12 text-center z-10 w-32 bg-white shadow-md p-2 rounded-md">
                {tooltip}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="flex items-center mr-4">
          <div className="mr-2">1-2</div>
          <div className="w-10 h-10 bg-green-100 rounded-md"></div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">3-4</div>
          <div className="w-10 h-10 bg-green-300 rounded-md"></div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">5-6</div>
          <div className="w-10 h-10 bg-green-600 rounded-md"></div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">7-8</div>
          <div className="w-10 h-10 bg-green-800 rounded-md"></div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">독후감</div>
          <div className="w-10 h-10 bg-gray-100 rounded-md flex justify-center items-center">
            <LuSprout className="text-green-500 w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heatmap;
