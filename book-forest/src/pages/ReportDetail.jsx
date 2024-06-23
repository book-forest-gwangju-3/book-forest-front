import { useParams } from "react-router-dom";
const ReportDetail = () => {
  const { id } = useParams();
  // params에 해당하는 독후감 데이터 가져오는 로직 추가
  return (
    <div>
      <h1>ReportDetail{id}번</h1>
    </div>
  );
};

export default ReportDetail;
