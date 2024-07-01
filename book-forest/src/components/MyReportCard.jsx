import Button from "./Button";
import { useNavigate } from "react-router-dom";

const MyReportCard = ({ item }) => {
  const nav = useNavigate();

  const formatDate = (dateTimeString) => {
    return dateTimeString.split('T')[0].replace(/-/g, '.');
  };

  const containerClass = "flex items-center justify-center my-6";
  const wrapperClass =
    "relative flex w-full flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md";
  const textWrapperClass = "p-6 pl-10 w-3/5";
  const rankClass = "mb-4 block font-semibold text-pink-500 antialiased";
  const titleClass =
    "mb-2 block text-2xl font-semibold text-blue-gray-900 antialiased overflow-hidden";
  const contentClass =
    "mb-12 block font-normal leading-relaxed text-gray-700 antialiased w-full";
  const imgWrapperClass =
    "p-6 flex items-center justify-center w-2/5 overflow-hidden rounded-xl rounded-r-none";
  const imgClass = "w-36 h-56 object-cover";

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <div className={textWrapperClass}>
          <h6 className={rankClass}>{formatDate(item.createdAt)}</h6>
          <h4 className={titleClass}>제목 : {item.title}</h4>
          <p className={contentClass}>{item.content}</p>
          <Button
            onClick={() => nav(`/report/${item.id}`)}
            text={"더보기"}
            color={"bg-pink-500 text-white"}
          />
        </div>
        <div className={imgWrapperClass}>
          <img src={item.cover} alt="image" className={imgClass} />
        </div>
      </div>
    </div>
  );
};

export default MyReportCard;
