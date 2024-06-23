import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "./../store/userSlice";
import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LiaTimesCircleSolid } from "react-icons/lia";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault()

    console.log(username, password1, password2, nickname)

    if (password1 !== password2) {
      console.log('비밀번호가 일치하지 않습니다')
      return
    }

    axios.post('http://localhost:8080/user/signup', {
      username,
      password: password1,
      nickname,
    })
    .then(() => {
      return axios.post('http://localhost:8080/user/login', {
        username,
        password: password1,
      });
    })
    .then((loginResponse) => {
      const { token, nickname } = loginResponse.data;
      dispatch(setUser({ token, isLogin: true, nickname }));

      navigate("/");
    })
    .catch((error) => {
      console.log('회원가입 또는 로그인 과정에서 오류가 발생했습니다:', error);
    });
  };

  const handleFirstPassword = (e) => {
    setPassword1(e.target.value);
    if (password2.length > 0) {
      setInfoMessage((password2 === e.target.value) ?
        ' ' :
        '비밀번호가 일치하지 않습니다');
    }
  };

  const handleSecondPassword = (e) => {
    setPassword2(e.target.value);
    if (password1.length > 0) {
      setInfoMessage((password1 === e.target.value) ?
       ' ' :
       '비밀번호가 일치하지 않습니다');
    } else {
      setInfoMessage('');
    }
  };

  return(
    <form onSubmit={handleSignup}>
      <label htmlFor="id">아이디</label>
      <input 
        id="id" 
        type="text" 
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password1">비밀번호</label>
      <input 
        id="password1" 
        type="password"
        value={password1}
        onChange={handleFirstPassword} 
      />
      <label htmlFor="password2">비밀번호 확인
        <span>
          {
            infoMessage === " " ? 
              <IoIosCheckmarkCircleOutline /> : 
              null
          }
          {
            infoMessage === "비밀번호가 일치하지 않습니다" ? 
              <LiaTimesCircleSolid /> :
              null
          }
          {infoMessage}
        </span>
      </label>
      <input 
        id="password2" 
        type="password"
        value={password2}
        onChange={handleSecondPassword} 
      />
      <label htmlFor="nickname">닉네임</label>
      <input 
        id="nickname" 
        type="text" 
        value={nickname}
        onChange={e => setNickname(e.target.value)}
      />
      <button type="submit">가입하기</button>
    </form>
  )
}

export default SignupForm