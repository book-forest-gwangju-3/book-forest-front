import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

const MypageHeader = () => {
  const pages = useSelector((state) => state.page.pages);

  const navClass = `pt-10 pb-9 text-xl`
  const noActive = `mr-9 cursor-pointer select-none text-color-18`
  const active = `mr-9 cursor-pointer select-none underline-after`
  
  return (
    <nav className={navClass}>
      <Link className={(pages[0]) ? active : noActive} to="/">책밭</Link>
      <Link className={(pages[1]) ? active : noActive} to="/my-report">나의 독후감</Link>
    </nav>
  )
}

export default MypageHeader