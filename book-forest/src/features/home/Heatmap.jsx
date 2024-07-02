import { useState, useMemo } from "react";
import { LuSprout } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import LoadingSpinner from "../../components/LoadingSpinner";
const Heatmap = ({ commitData, isLoading }) => {
  const nav = useNavigate();
  const [filter, setFilter] = useState(3);

  const filterChange = (e) => {
    setFilter(Number(e.target.value));
  };

  const dateRange = useMemo(() => {
    const today = new Date();
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - filter);

    const range = [];
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      range.push(`${year}-${month}-${day}`);
    }
    return range;
  }, [filter]);

  const filteredData = useMemo(() => {
    return dateRange.map((date) => {
      const dayData = commitData && commitData[date] ? commitData[date] : [];
      const totalExp = dayData.reduce((sum, commit) => sum + commit.exp, 0);
      const hasReview = dayData.some(
        (commit) => commit.commitType === "BookReview"
      );
      return { date, exp: totalExp, review: hasReview };
    });
  }, [commitData, dateRange]);

  const getColor = (exp) => {
    if (exp > 300) return "bg-color-4";
    if (exp > 200) return "bg-color-8";
    if (exp > 100) return "bg-color-7";
    if (exp > 0) return "bg-color-6";
    return "bg-color-16";
  };

  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = (date) => {
    setTooltip(date);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
              commit.exp
            )}`}
            onMouseEnter={() => handleMouseEnter(commit.date)}
            onMouseLeave={handleMouseLeave}
          >
            {commit.review && <LuSprout className="text-green-500 w-6 h-6" />}
            {tooltip === commit.date && (
              <div className="absolute top-12 -right-12 text-center z-10 w-32 bg-white shadow-md p-2 rounded-md">
                {commit.date}
                <br></br> {commit.exp} EXP
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="flex items-center mr-4">
          <div className="mr-2">1 - 100</div>
          <div className="w-10 h-10 bg-color-6 rounded-md"></div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">101 - 200</div>
          <div className="w-10 h-10 bg-color-7 rounded-md"></div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">201 - 300</div>
          <div className="w-10 h-10 bg-color-8 rounded-md"></div>
        </div>
        <div className="flex items-center mr-4">
          <div className="mr-2">301 +</div>
          <div className="w-10 h-10 bg-color-4 rounded-md"></div>
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
