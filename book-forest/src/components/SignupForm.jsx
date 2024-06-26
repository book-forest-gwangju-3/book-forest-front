import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "./../features/user/userSlice";
import axios from "axios";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LiaTimesCircleSolid } from "react-icons/lia";

const remote = axios.create()

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [lengthMessage, setLengthMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      console.log('비밀번호가 일치하지 않습니다');
      return;
    }

    if (password1.length < 8) {
      console.log('비밀번호는 최소 8글자 이상이어야 합니다');
      return;
    }

    // axios 요청 보내는 방법 1 )
    try {
      // const response = await remote.get('https://pokeapi.co/api/v2/pokemon')   // 임시 open api
      const response = await remote.post('http://localhost:8080/user/signup', {
        username,
        password: password1,
        nickname
      });

      console.log(response)
      // const { token, nickname: responseNickname } = response.data;
      // dispatch(setUser({ token, isLogin: true, nickname: responseNickname }));

      navigate("/");
    } catch (error) {
      console.log('회원가입 또는 로그인 과정에서 오류가 발생했습니다:', error);
    }

    
    // axios 요청 보내는 방법 2 )
    // remote.post('http://localhost:8080/user/signup', {
    //   username,
    //   password: password1,
    //   nickname
    // })
    // .then(response => {
    //   console.log(response);
    //   // const { token, nickname: responseNickname } = response.data;
    //   // dispatch(setUser({ token, isLogin: true, nickname: responseNickname }));

    //   navigate("/");
    // })
    // .catch(error => {
    //   console.log('회원가입 또는 로그인 과정에서 오류가 발생했습니다:', error);
    // });
  };

  const handleFirstPassword = (e) => {
    setPassword1(e.target.value);
    setLengthMessage((e.target.value.length >= 8) ?
      ' ' :
      '비밀번호는 최소 8글자 이상이어야 합니다'
      )
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

  const form = `flex flex-col justify-center w-2/5 pt-2 pb-6`
  const label = `text-color-18 mb-1.5 select-none`
  const ipt = `border border-color-17 w-full py-2 px-4 mb-3.5 outline-none rounded-lg`
  const btn = `w-full bg-color-3 py-2 text-xl rounded-lg mt-6`
  const info = `flex items-center`
  const infoFlex = `flex items-center text-sm text-color-12 ml-1`

  return(
    <form className={form} onSubmit={handleSignup}>
      <label className={label} htmlFor="id">아이디</label>
      <input 
        className={ipt}
        id="id" 
        type="text" 
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="username"
        required
      />
      <label className={`${label} ${info}`} htmlFor="password1">비밀번호
        <span className={infoFlex}>
            <span className="mr-1">
              {
                lengthMessage === " " ? 
                  <IoIosCheckmarkCircleOutline size="16" color="#74AA6B"/> : 
                  null
              }
              {
                lengthMessage === "비밀번호는 최소 8글자 이상이어야 합니다" ? 
                  <LiaTimesCircleSolid size="16" /> :
                  null
              }
            </span>
            {lengthMessage}
          </span>
      </label>
      <input 
        className={ipt}
        id="password1" 
        type="password"
        value={password1}
        onChange={handleFirstPassword} 
        autoComplete="current-password"
        required
      />
      <label className={`${label} ${info}`} htmlFor="password2">비밀번호 확인
        <span className={infoFlex}>
          <span className="mr-1">
            {
              infoMessage === " " ? 
                <IoIosCheckmarkCircleOutline size="16" color="#74AA6B"/> : 
                null
            }
            {
              infoMessage === "비밀번호가 일치하지 않습니다" ? 
                <LiaTimesCircleSolid size="16" /> :
                null
            }
          </span>
          {infoMessage}
        </span>
      </label>
      <input 
        className={ipt}
        id="password2" 
        type="password"
        value={password2}
        onChange={handleSecondPassword} 
        autoComplete="current-password"
        required
      />
      <label className={label} htmlFor="nickname">닉네임</label>
      <input 
        className={ipt}
        id="nickname" 
        type="text" 
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        required
      />
      <button className={btn} type="submit">가입하기</button>
    </form>
  )
}

export default SignupForm