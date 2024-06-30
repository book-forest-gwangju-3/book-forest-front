import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "./../features/page/pageSlice";
import MyPage from "../features/home/MyPage";
import Streak from "../features/home/Streak";
import axios from "axios";

const HomeMain = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [commitData, setCommitData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(setPage(0));
  }, [dispatch]);

  useEffect(() => {
    const fetchCommitData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/commits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommitData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching commitdata", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommitData();
  }, [token]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<MyPage commitData={commitData} isLoading={isLoading} />}
        />
        <Route path="/streak" element={<Streak commitData={commitData}/>} />
      </Routes>
    </div>
  );
};

export default HomeMain;
