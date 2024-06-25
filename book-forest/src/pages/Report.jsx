import SectionTitle from "../components/SectionTitle";
import ReportCard from "../components/ReportCard";
import ReportList from "../features/reports/ReportList";
import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";

const Report = () => {
  return (
    <div>
      <SectionTitle text={"주간 인기 독후감"} type={"text-center"} />
      <ReportCard img={img1} text={"주간 독후감 1위"} />
      <ReportCard img={img2} text={"주간 독후감 2위"} />
      <ReportCard img={img3} text={"주간 독후감 3위"} />
      <ReportList />
    </div>
  );
};

export default Report;
