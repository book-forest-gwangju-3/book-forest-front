import SectionTitle from "../components/SectionTitle";
import ReportCard from "../components/ReportCard";
import ReportList from "../features/reports/ReportList";
import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";
import { useState, useEffect } from "react";
import axios from "axios";
const Report = () => {
  const [weeklyBest, setWeeklyBest] = useState([]);
  useEffect(() => {
    const fetchWeeklyBest = async () => {
      try {
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
          img={img1}
          key={item.id}
          text={`주간 독후감 ${index + 1}위`}
        />
      ))}
      <ReportList />
    </div>
  );
};

export default Report;
