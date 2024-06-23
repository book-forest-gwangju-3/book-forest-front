import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "./../store/userSlice";
import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(username, password);

    axios.post('http://localhost:8080/user/login', {
      username,
      password,
    }).then(response => {
      const { token, nickname } = response.data;
      dispatch(setUser({ token, isLogin: true, nickname }));
      navigate("/");
    }).catch(error => {
      console.log('로그인에 실패했습니다. 다시 시도해주세요', error);
    });
  };

  return(
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        value={username} 
        placeholder="아이디 입력"
        onChange={e => setUsername(e.target.value)}  
      />
      <input 
        type="password" 
        value={password}
        placeholder="비밀번호 입력"
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
