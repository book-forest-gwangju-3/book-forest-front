import { useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";
const imgList = [
  img1,
  img2,
  img3,
  img1,
  img2,
  img3,
  img1,
  img2,
  img3,
  img1,
  img2,
  img3,
  img1,
  img2,
  img3,
];
const Slider = () => {
  const ref = useRef(null);

  const containerClass = "flex items-center justify-center space-x-4";
  const sliderClass =
    "flex flex-nowrap overflow-x-auto space-x-4 scroll-smooth";
  const buttonClass = "text-2xl w-12 h-12 ";
  const imgClass = "flex-shrink-0 w-44 h-72 object-cover rounded-lg shadow-md";
  const prevButton = () => {
    if (ref.current) ref.current.scrollLeft -= 192; // 스크롤 왼쪽으로 이동
  };

  const nextButton = () => {
    if (ref.current) ref.current.scrollLeft += 192; // 스크롤 오른쪽으로 이동
  };
  return (
    <div className={containerClass}>
      <button onClick={prevButton} className={buttonClass}>
        <SlArrowLeft />
      </button>
      <div ref={ref} className={sliderClass}>
        {imgList.map((url, index) => (
          <img
            key={index} // id로 바꾸기
            src={url}
            alt={`Image ${index + 1}`}
            className={imgClass}
          />
        ))}
      </div>
      <button onClick={nextButton} className={buttonClass}>
        <SlArrowRight />
      </button>
    </div>
  );
};
export default Slider;
