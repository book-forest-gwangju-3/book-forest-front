import SectionTitle from "../components/SectionTitle";
import ReportCard from "../components/ReportCard";
import ReportList from "../features/reports/ReportList";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsDbInitialized } from "../features/user/userSlice";
import axios from "axios";

const Report = () => {
  const [weeklyBest, setWeeklyBest] = useState([]);
  const dispatch = useDispatch();
  const isDbInitialized = useSelector((state) => state.user.isDbInitialized);

  useEffect(() => {
    const fetchWeeklyBest = async () => {
      try {
        if (!isDbInitialized) {
          // 초기 데이터 안받아왔을때만 받아오기
          await axios.post("http://localhost:8080/initdb/bomb", {
            page: 1,
            itemsPerPage: 30,
          });
          console.log("초기 db 받아오기");
          dispatch(setIsDbInitialized(true));
        }

        const response = await axios.get(
          `http://localhost:8080/book-reviews?sortBy=weeklyBest`
        );
        setWeeklyBest(response.data.bookReviews);
        console.log(response.data.bookReviews);
      } catch (error) {
        console.error("Error fetching fetchWeeklyBest", error);
      }
    };
    fetchWeeklyBest();
  }, []);
  return (
    <div>
      <SectionTitle text={"주간 인기 독후감"} type={"text-center"} />
      {weeklyBest.map((item, index) => (
        <ReportCard
          item={item}
          key={item.id}
          text={`주간 독후감 ${index + 1}위`}
        />
      ))}
      <ReportList />
    </div>
  );
};

export default Report;
