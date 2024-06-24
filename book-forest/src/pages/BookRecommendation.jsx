import SectionTitle from "../components/SectionTitle";
import Slider from "../components/Slider";

const BookRecommendation = () => {
  const contentWrapperClass = "mb-12";
  return (
    <main>
      <div className={contentWrapperClass}>
        <SectionTitle text={"베스트 셀러"} type={"text-center"} />
        <Slider />
      </div>
      <div className={contentWrapperClass}>
        <SectionTitle text={"신간 도서"} type={"text-center"} />
        <Slider />
      </div>
      <div className={contentWrapperClass}>
        <SectionTitle text={"편집자 추천"} type={"text-center"} />
        <Slider />
      </div>
    </main>
  );
};

export default BookRecommendation;
