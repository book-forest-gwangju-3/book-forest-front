import { useNavigate } from "react-router-dom";
import { formatDateYMD } from "../../utils/dateUtils";

const ReportListItem = ({ item }) => {
  const nav = useNavigate();
  const tableBodyWrapperClass = "text-sm text-gray-700";
  const tableBodyClass =
    "hover:bg-gray-100 border-b border-gray-200 text-center";
  const tableBodyTitleClass = "px-4 py-4 text-left cursor-pointer";
  const tableBodyWriterClass = "px-4 py-4";
  return (
    <tr onClick={() => nav(`/report/${item.id}`)} className={tableBodyClass}>
      <td className={tableBodyTitleClass}>{item.title}</td>
      <td className={tableBodyWriterClass}>{item.user.username}</td>
      <td className={tableBodyWrapperClass}>{formatDateYMD(item.createdAt)}</td>
    </tr>
  );
};
export default ReportListItem;
