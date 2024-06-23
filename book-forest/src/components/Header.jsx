import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import styles from "./Header.module.css"

const Header = () => {
  const isLogin = true  // 테스트용 임시 변수
  const navigate = useNavigate()

  const Logout = () => {
    console.log('로그아웃 과정 진행')
    navigate("/login")
  }

  const headerClass = `bg-color-10 text-color-1 flex justify-center relative`;
  const logo = `text-3xl p-3.5`
  const navClass = `flex justify-center items-center`
  const navItemClass = `p-2 mx-4`
  const hrClass = `border-color-7`

  return (
    <header className={styles.header}>
      <div className={headerClass}>
        <Link className={logo} to="/" >Logo</Link>
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
                  <Link to="/">나의 독후감</Link>
                </div>
              </div>
            </div>
            <div onClick={Logout} className={styles.item}>로그아웃</div>
          </div> :
          <div className={styles.container}>
            <Link className={styles.item} to="/login" >로그인</Link>
            <Link className={styles.item} to="/signup" >회원가입</Link>
          </div>
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