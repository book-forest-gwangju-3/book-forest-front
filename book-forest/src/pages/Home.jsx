import { Routes, Route } from "react-router-dom";
import MypageHeader from "../components/MypageHeader";
import HomeMain from "./HomeMain";
import HomeMyReport from "./HomeMyReport";

const Home = () => {
  return (
    <>
      <MypageHeader />
      <Routes>
        <Route path="*" element={<HomeMain />} />
        <Route path="/my-report" element={<HomeMyReport />} />
      </Routes>
    </>
  )
};

export default Home;
