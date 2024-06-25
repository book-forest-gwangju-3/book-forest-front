import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "./../features/page/pageSlice";
import Heatmap from "../features/home/Heatmap";
import Streak from "../features/home/Streak";
const HomeMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Heatmap />} />
        <Route path="/streak" element={<Streak />} />
      </Routes>
    </div>
  );
};

export default HomeMain;
