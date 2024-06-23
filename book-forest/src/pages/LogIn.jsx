import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"

const LogIn = () => {
  const container = `flex flex-col justify-center items-center py-28`
  const title = `text-3xl select-none`
  const signup = `text-color-5`

  return (
    <div className={container}>
      <h1 className={title}>로그인</h1>
      <LoginForm />
      <Link to="/signup" className={signup}>회원가입</Link>
    </div>
  )
};

export default LogIn;
