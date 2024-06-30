import { useSelector } from "react-redux"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTier = () => {
  // 로그인한 유저 데이터 받아오기
  const [userRanking, setUserRanking] = useState({});
  const token = useSelector((state) => state.user.token);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (!token) return;

    const fetchUserTier = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/my-tier`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        // 100에서 백분율을 뺀 값으로 상위 퍼센티지 계산
        data.upperPercent = 100 - data.position;
        setUserRanking(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user tier:', error);
      }
    };

    fetchUserTier();
  }, [token]);

  const container = `w-full flex justify-between items-end border-b-2 border-color-16 mt-10 mb-8 px-8`;
  const left = `flex text-3xl`;
  const right = `flex text-color-17`;

  return (
    <>
      {isLogin ? (
        <div className={container}>
          <div className={left}>
            <div className="mr-10">
              <span className="text-color-9">?</span>
              <span className="text-base text-color-17 ml-1">위</span>
            </div>
            <div>{userRanking.user?.nickname}</div>
          </div>
          <div className={right}>
            <div className="mr-8 text-color-4 font-bold">{userRanking.tierName}</div>
            <div className="mr-8">상위 {userRanking.upperPercent} %</div>
            <div>{userRanking.exp} p</div>
          </div>
        </div>
      ) :
      <div className="mt-10"></div>
      }
    </>
  );
};

export default UserTier;
