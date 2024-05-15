import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./Login.module.css";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';

import { useDispatch } from 'react-redux';
import { setUserUid } from '../store/userSlice';


const Login = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHomeIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSignupClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);


  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onLoginSubmitClick();
    }
  };

  const onLoginSubmitClick = useCallback(async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("로그인 성공");

      // store
      dispatch(setUserUid.login({uid: user.uid}));

      // 로그인 후 다음 페이지로 이동하거나 다른 작업 수행
      navigate("/main/login");
    } catch (error) {
      console.error("로그인 실패:", error.message);
      alert("다시 시도해주세요");
    }
  }, [email, password, navigate, dispatch]);


  return (
    <div className={styles.frame}>
      <div className={styles.homeIconContainer}>
        <img
          className={styles.homeIcon}
          loading="lazy"
          alt="Home"
          src="/home-icon.svg"
          onClick={onHomeIconClick} />
      </div>
      
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo isLogout={true}/>
        </div>

        <h1 className={styles.loginText}>로그인</h1>

        <div className={styles.inputBoxContainer}>
          <input
            className={styles.frameEmail}
            placeholder="이메일"
            type="text"
            onChange={onEmailChange}
            onKeyDown={handleKeyPress}
          />
          <input
            className={styles.framePassword}
            placeholder="비밀번호"
            type="password"
            onChange={onPasswordChange}
            onKeyDown={handleKeyPress}
          />
        </div>

        <b className={styles.loginSubmit} onClick={onLoginSubmitClick}>
          로그인하기
        </b>

        <b className={styles.goToSignUp} onClick={onSignupClick}>
          회원가입
        </b>
      </div>
    </div>
  );
};

export default Login;
