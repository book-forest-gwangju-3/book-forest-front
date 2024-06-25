import { useNavigate } from "react-router-dom";
const ReportListItem = ({ item }) => {
  const nav = useNavigate();
  const tableBodyWrapperClass = "text-sm text-gray-700";
  const tableBodyClass =
    "hover:bg-gray-100 border-b border-gray-200 text-center";
  const tableBodyTitleClass = "px-4 py-4 text-left cursor-pointer";
  const tableBodyWriterClass = "px-4 py-4";
  return (
    <tr
      onClick={() => nav(`/report/${item["book-review-id"]}`)}
      className={tableBodyClass}
    >
      <td className={tableBodyTitleClass}>{item.title}</td>
      <td className={tableBodyWriterClass}>{item.user.nickname}</td>
      <td className={tableBodyWrapperClass}>{item["created-at"]}</td>
    </tr>
  );
};
export default ReportListItem;
