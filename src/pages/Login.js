import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const onHomeIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onLoginSubmitClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const onSignupClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

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
          <Logo />
        </div>

        <h1 className={styles.loginText}>로그인</h1>

        <div className={styles.inputBoxContainer}>
          <input
            className={styles.frameEmail}
            placeholder="이메일"
            type="text"
          />
          <input
            className={styles.framePassword}
            placeholder="비밀번호"
            type="password"
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
