import { useRef } from "react";
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

  const prevButton = () => {
    if (ref.current) ref.current.scrollLeft -= 192; // 스크롤 왼쪽으로 이동
  };

  const nextButton = () => {
    if (ref.current) ref.current.scrollLeft += 192; // 스크롤 오른쪽으로 이동
  };
  return (
    <div
      className="flex items-center justify-center space-x-4 mx-auto"
      style={{ width: "1200px" }}
    >
      <button
        onClick={prevButton}
        className="text-2xl w-12 h-12 flex items-center justify-center"
      >
        &lt;
      </button>
      <div ref={ref} className="flex flex-nowrap overflow-x-auto space-x-4">
        {imgList.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            className="flex-shrink-0 w-44 h-72 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
      <button
        onClick={nextButton}
        className="text-2xl w-12 h-12 flex items-center justify-center"
      >
        &gt;
      </button>
    </div>
  );
};
export default Slider;
