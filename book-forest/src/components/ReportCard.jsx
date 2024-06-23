import Button from "./Button";
const ReportCard = ({ img, text }) => {
  const containerClass = "flex items-center justify-center my-6";
  const wrapperClass =
    "relative flex w-full flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md";
  const textWrapperClass = "p-6 pl-10";
  const rankClass = "mb-4 block font-semibold text-pink-500 antialiased";
  const titleClass =
    "mb-2 block text-2xl font-semibold text-blue-gray-900 antialiased";
  const writerClass = "mb-2 block";
  const contentClass =
    "mb-8 block font-normal leading-relaxed text-gray-700 antialiased";
  const imgWrapperClass =
    "p-6 pl-44 relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none";
  const imgClass = "w-auto h-auto object-cover";
  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <div className={textWrapperClass}>
          <h6 className={rankClass}>{text}</h6>
          <h4 className={titleClass}>도취된 권력, 타락한 정의를 읽고</h4>
          <p className={writerClass}>hayeon</p>
          <p className={contentClass}>
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software
            company selling licenses. Yet its own business model disruption is
            only part of the story
          </p>
          <Button text={"더보기"} color={"bg-pink-500 text-white"} />
        </div>
        <div className={imgWrapperClass}>
          <img src={img} alt="image" className={imgClass} />
        </div>
      </div>
    </div>
  );
};
export default ReportCard;
