import { useNavigate } from "react-router-dom"

const SignupForm = () => {
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()

    console.log('회원가입 과정 진행')
    console.log('로그인 과정 진행')
    navigate("/")
  }

  return(
    <form action="" onSubmit={handleSignup}>
      <label htmlFor="id">아이디</label>
      <input type="text" id="id" />
      <label htmlFor="password1">비밀번호</label>
      <input type="password" id="password1" />
      <label htmlFor="password2">비밀번호 확인</label>
      <input type="password" id="password2" />
      <label htmlFor="nickname">닉네임</label>
      <input type="text" id="nickname" />
      <button type="submit">가입하기</button>
    </form>
  )
}

export default SignupForm