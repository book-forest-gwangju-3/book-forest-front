import { useParams } from "react-router-dom";
const ReportEditor = () => {
  const { id } = useParams();
  return <div>{id}번 글 Editor</div>;
};
export default ReportEditor;
