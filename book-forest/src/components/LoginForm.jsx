import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setUserInfo } from "./../features/user/userSlice";
import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("password", password);
    formData.append("username", username);

    axios
      .post("http://localhost:8080/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const token = response.headers.authorization.replace("Bearer ", "");
        dispatch(setUser({ token }));

        console.log("로그인 성공");
        return axios.get("http://localhost:8080/user/my-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((userInfoResponse) => {
        dispatch(setUserInfo(userInfoResponse.data));
        console.log("사용자 정보 저장 성공");
        navigate("/");
      })
      .catch((error) => {
        console.log(
          "로그인 또는 사용자 정보 요청에 실패했습니다. 다시 시도해주세요",
          error
        );
      });
  };

  const form = `flex flex-col items-center justify-center w-2/5 pt-8 pb-6`;
  const ipt = `w-full py-2 px-4 mb-7 border-b-2 border-color-3 outline-none`;
  const btn = `w-full bg-color-3 py-2 text-xl rounded-lg`;

  return (
    <form className={form} onSubmit={handleLogin}>
      <input
        className={ipt}
        type="text"
        value={username}
        placeholder="아이디 입력"
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        required
      />
      <input
        className={ipt}
        type="password"
        value={password}
        placeholder="비밀번호 입력"
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />
      <button className={btn} type="submit">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
