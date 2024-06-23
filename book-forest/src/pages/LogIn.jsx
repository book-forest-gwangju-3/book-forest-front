import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"

const LogIn = () => {
  return (
    <>
      <h1>로그인</h1>
      <LoginForm />
      <Link to="/signup" >회원가입</Link>
    </>
  )
};

export default LogIn;
