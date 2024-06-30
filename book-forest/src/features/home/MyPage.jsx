import HeatMap from "./Heatmap";
import SectionTitle from "../../components/SectionTitle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Slider from "../../components/Slider";
const MyPage = ({ commitData, isLoading }) => {
  const [readingBooks, setReadingBooks] = useState([]); // 읽고 있는 책
  const [completedBooks, setCompletedBooks] = useState([]); // 다 읽은 책
  const token = useSelector((state) => state.user.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchReadingBooks = async () => {
      try {
        const [readingResponse, completedResponse] = await Promise.all([
          axios.get(`http://localhost:8080/user/${userInfo.id}/books/reading`),
          axios.get(
            `http://localhost:8080/user/${userInfo.id}/books/completed`
          ),
        ]);

        setReadingBooks(readingResponse.data);
        setCompletedBooks(completedResponse.data);

        console.log("Reading books:", readingResponse.data);
        console.log("Completed books:", completedResponse.data);
      } catch (error) {
        console.error("Error fetching reading books", error);
      }
    };
    fetchReadingBooks();
  }, [userInfo]);

  return (
    <main>
      <HeatMap commitData={commitData} isLoading={isLoading} />
      <SectionTitle text={"읽고 있는 도서"} />
      <Slider
        item={readingBooks}
        message={"현재 독서 진행중인 책이 없습니다."}
      />
      <SectionTitle text={"읽은 도서"} />
      <Slider
        item={completedBooks}
        message={"아직 독서를 완료한 책이 없습니다."}
      />
    </main>
  );
};
export default MyPage;
