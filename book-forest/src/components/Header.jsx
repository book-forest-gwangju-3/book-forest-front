import { Link } from "react-router-dom"
import HeaderUnder from "./HeaderLogin"
import HeaderNoLogin from "./HeaderNoLogin"
import HeaderLogin from "./HeaderLogin"

const Header = () => {
  const isLogin = true  // 테스트용 임시 변수

  return (
    <header>
      <div>
        <Link to="/" >책밭</Link>
        {(isLogin) ? 
          <HeaderLogin /> :
          <HeaderNoLogin />
        }
      </div>
      <div>
        <Link to="/" >책밭</Link>
        <Link to="/report" >독후감</Link>
        <Link to="/book-recommendation" >책추천</Link>
        <Link to="/tier" >랭킹</Link>
    </div>
    </header>
  )
}

export default Header