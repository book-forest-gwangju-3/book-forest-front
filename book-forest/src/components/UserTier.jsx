import { FaTrophy } from "react-icons/fa";

const UserTier = () => {
  // axios로 로그인한 유저 데이터 받아오기

  
  // 임시 데이터
  const data = {
    nickname: 'NickName',
    rank: 32,
    tier: 'BRONZE',
    percent: 25,
    point: 1020,
  }

  const container = `w-full flex justify-between items-end border-b-2 border-color-16 mt-10 mb-8 px-8`
  const left = `flex text-3xl`
  const right = `flex text-color-17`

  return (
    <div className={container}>
      <div className={left}>
        <div className="mr-10">
          <span className="text-color-9">{data.rank}</span>
          <span className="text-base text-color-17 ml-1">위</span>
        </div>
        <div>{data.nickname}</div>
      </div>
      <div className={right}>
        <div className="mr-8 text-color-4 font-bold">{data.tier}</div>
        <div className="mr-8">상위 {data.percent} %</div>
        <div>{data.point} p</div>
      </div>
    </div>
  )
}

export default UserTier