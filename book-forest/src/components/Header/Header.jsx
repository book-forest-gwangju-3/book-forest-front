import { Link } from "react-router-dom"
import HeaderLogin from "./HeaderLogin"
import HeaderNoLogin from "./HeaderNoLogin"

const Header = () => {
  const isLogin = false  // 테스트용 임시 변수

  const headerClass = `bg-color-10 text-color-1 flex justify-center relative`;
  const logo = `text-3xl p-3.5`
  const navClass = `flex justify-center items-center`
  const navItemClass = `p-2 mx-4`
  const hrClass = `border-color-7`

  return (
    <header>
      <div className={headerClass}>
        <Link className={logo} to="/" >Logo</Link>
        {(isLogin) ? 
          <HeaderLogin /> :
          <HeaderNoLogin />
        }
      </div>
      <div className={navClass}>
        <Link className={navItemClass} to="/" >책밭</Link>
        <Link className={navItemClass} to="/report" >독후감</Link>
        <Link className={navItemClass} to="/book-recommendation" >책추천</Link>
        <Link className={navItemClass} to="/tier" >랭킹</Link>
      </div>
      <hr className={hrClass} />
    </header>
  )
}

export default Header