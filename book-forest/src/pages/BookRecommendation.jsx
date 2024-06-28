import SectionTitle from "../components/SectionTitle";
import Slider from "../components/Slider";
import { useEffect, useState } from "react";
import axios from "axios";
const BookRecommendation = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [newSpecial, setNewSpecial] = useState([]);
  const [editorPicks, setEditorPicks] = useState([]);
  const [newAll, setNewAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const requestBody = {
        page: 1,
        itemsPerPage: 30,
      };
      try {
        const [
          bestResponse,
          newSpecialResponse,
          editorResponse,
          newAllResponse,
        ] = await Promise.all([
          axios.post("http://localhost:8080/initdb/best", requestBody),
          axios.post("http://localhost:8080/initdb/new-special", requestBody),
          axios.post("http://localhost:8080/initdb/editor", requestBody),
          axios.post("http://localhost:8080/initdb/new-all", requestBody),
        ]);
        setBestSellers(bestResponse.data);
        setNewSpecial(newSpecialResponse.data);
        setEditorPicks(editorResponse.data);
        setNewAll(newAllResponse.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const contentWrapperClass = "mb-12";
  return (
    <main>
      <div className={contentWrapperClass}>
        <SectionTitle text={"베스트 셀러"} type={"text-center"} />
        <Slider item={bestSellers} />
      </div>
      <div className={contentWrapperClass}>
        <SectionTitle text={"주목할 만한 신간도서"} type={"text-center"} />
        <Slider item={newSpecial} />
      </div>
      <div className={contentWrapperClass}>
        <SectionTitle text={"편집자 추천"} type={"text-center"} />
        <Slider item={editorPicks} />
      </div>
      <div className={contentWrapperClass}>
        <SectionTitle text={"신간도서"} type={"text-center"} />
        <Slider item={newAll} />
      </div>
    </main>
  );
};

export default BookRecommendation;
