import Button from "../components/Button";
import Slider from "../components/Slider";
import SearchForm from "../components/SearchForm";
const BookRecommendation = () => {
  const clickHandler = () => {
    console.log("ㅎㅇ");
  };
  return (
    <div>
      <div>BookRecommendation</div>
      <Button
        text={"작성"}
        color={"bg-color-3"}
        onClick={clickHandler}
      ></Button>
      <Slider />
      <SearchForm text={"검색어를 입력해주세요"} type={"max-w-md"} />
      <SearchForm text={"도서제목을 입력해주세요"} />
    </div>
  );
};

export default BookRecommendation;
