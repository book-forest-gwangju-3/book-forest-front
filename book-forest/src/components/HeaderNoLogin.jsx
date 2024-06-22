import { Link } from "react-router-dom"
import styles from "./HeaderNoLogin.module.css"

const HeaderNoLogin = () => {
  return (
    <div className={styles.container}>
      <Link className={styles.item} to="/login" >로그인</Link>
      <Link className={styles.item} to="/signup" >회원가입</Link>
    </div>
  )
}

export default HeaderNoLogin