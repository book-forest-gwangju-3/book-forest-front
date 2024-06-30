import React from "react";
import { useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
const Slider = ({ item, message }) => {
  const ref = useRef(null);
  const nav = useNavigate();
  const containerClass = "flex items-center justify-center space-x-4";
  const sliderClass =
    "flex flex-nowrap overflow-x-auto space-x-4 scroll-smooth";
  const buttonClass = "text-2xl w-12 h-12 ";
  const imgClass =
    "flex-shrink-0 w-44 h-72 object-cover rounded-lg cursor-pointer hover:scale-105";
  const prevButton = () => {
    if (ref.current) ref.current.scrollLeft -= 192; // 스크롤 왼쪽으로 이동
  };

  const nextButton = () => {
    if (ref.current) ref.current.scrollLeft += 192; // 스크롤 오른쪽으로 이동
  };

  const hasItems = item?.items && item.items.length > 0;
  return (
    <div className={containerClass}>
      {hasItems && (
        <button onClick={prevButton} className={buttonClass}>
          <SlArrowLeft />
        </button>
      )}
      <div ref={ref} className={sliderClass}>
        {hasItems ? (
          item.items.map((book, index) => (
            <img
              key={book.id}
              src={book.coverUrl}
              alt={`Book cover ${index + 1}`}
              className={imgClass}
              onClick={() => nav(`/book/${book.id}`)}
            />
          ))
        ) : (
          <p className="my-20">{message}</p>
        )}
      </div>
      {hasItems && (
        <button onClick={nextButton} className={buttonClass}>
          <SlArrowRight />
        </button>
      )}
    </div>
  );
};
export default Slider;
