import UserTier from "../components/UserTier";
import Ranking from "./../features/tier/Ranking";

const Tier = () => {
  const test = `flex flex-col items-center`

  return (
    <div className={test}>
      <UserTier />
      <Ranking />
    </div>
  )
};

export default Tier;
