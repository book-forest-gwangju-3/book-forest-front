import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    console.log('로그인 과정 진행')
    navigate("/")
  }

  return(
    <form action="" onSubmit={handleLogin}>
      <input type="text" />
      <input type="password" />
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm