import Button from "../components/Button";
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
    </div>
  );
};

export default BookRecommendation;
