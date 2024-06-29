import HeatMap from "./Heatmap";

const MyPage = ({ commitData, isLoading }) => {
  return (
    <main>
      <HeatMap commitData={commitData} isLoading={isLoading} />
    </main>
  );
};
export default MyPage;
