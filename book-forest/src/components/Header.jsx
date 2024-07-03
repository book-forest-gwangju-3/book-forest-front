import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "./../features/user/userSlice"
import { FaUserCircle } from "react-icons/fa"
import styles from "./Header.module.css"
import MainLogo from "./../assets/img/logo.png";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.user.isLogin)

  const logOut = async () => {
    console.log('로그아웃')
    dispatch(clearUser())
    navigate("/login")
  };

  const handleLinkClick = (e, path) => {
    if (!isLogin) {
      e.preventDefault();
      alert('로그인이 필요한 서비스입니다.');
      navigate("/login");
    } else {
      navigate(path);
    }
  }

  const headerClass = `bg-color-10 text-color-1 flex justify-center relative`;
  const logo = `text-3xl p-2 flex`
  const navClass = `flex justify-center items-center`
  const navItemClass = `p-2 mx-4`
  const hrClass = `border-color-7`

  return (
    <header className={styles.header}>
      <div className={headerClass}>
        <a className={logo} href="/"><img src={MainLogo} alt="Logo" className="w-40"/></a>
        {(isLogin) ? 
          <div className={styles.container}>
            <div className={styles.user}>
              <FaUserCircle size="20"/>
              <div className={styles.drop}>
                <div>
                  <Link to="/">책밭</Link>
                </div>
                <hr />
                <div>
                  <Link to="/my-report">나의 독후감</Link>
                </div>
              </div>
            </div>
            <div onClick={logOut} className={styles.item}>로그아웃</div>
          </div> :
          <div className={styles.container}>
            <Link className={styles.item} to="/login" >로그인</Link>
            <Link className={styles.item} to="/signup" >회원가입</Link>
          </div>
        }
      </div>
      <div className={navClass}>
        <a className={navItemClass} onClick={(e) => handleLinkClick(e, "/")} href="/" >책밭</a>
        <Link className={navItemClass} to="/report" >독후감</Link>
        <Link className={navItemClass} to="/book-recommendation" >책추천</Link>
        <Link className={navItemClass} to="/book/search" >검색</Link>
        <Link className={navItemClass} to="/tier" >랭킹</Link>
      </div>
      <hr className={hrClass} />
    </header>
  )
}

export default Header