import { Link, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import style from "./HeaderNoLogin.module.css"
import styles from "./HeaderLogin.module.css"

const HeaderLogin = () => {
  const navigate = useNavigate()

  const Logout = () => {
    console.log('로그아웃 과정 진행')
    navigate("/login")
  }

  return (
    <div className={style.container}>
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
      <div onClick={Logout} className={style.item}>로그아웃</div>
    </div>
  )
}

export default HeaderLogin