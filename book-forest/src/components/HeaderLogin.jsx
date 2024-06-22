import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"

const HeaderLogin = () => {
  return (
    <div>
        <div><FaUserCircle /></div>
        <div>로그아웃</div>
    </div>
  )
}

export default HeaderLogin