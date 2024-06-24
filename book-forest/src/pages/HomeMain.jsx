import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "./../features/page/pageSlice";
import Heatmap from "../features/home/Heatmap";
const HomeMain = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  return (
    <div>
      <Heatmap />
    </div>
  );
};

export default HomeMain;
