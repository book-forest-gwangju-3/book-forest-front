const ReportFilterButton = () => {
  const containerClass = "text-right";
  const selectBoxClass =
    "text-center rounded-lg border border-gray-300 text-md text-gray-700 h-10 pl-2 bg-white hover:border-gray-400 focus:outline-none";
  return (
    <div className={containerClass}>
      <select className={selectBoxClass}>
        <option>최신순</option>
        <option>좋아요 순</option>
        <option>댓글 많은 순</option>
      </select>
    </div>
  );
};
export default ReportFilterButton;
