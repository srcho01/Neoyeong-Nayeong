import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Logo from "./Logo.js"

const LoginPage = () => {
  const navigate = useNavigate();

  const onLoginSubmitClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const onSignupClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <section className={styles.loginPage}>
      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.loginText}>
            <h1 className={styles.h1}>로그인</h1>
          </div>
          <div className={styles.frameContainer}>
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
            <div className={styles.loginButton}>
              <b className={styles.b} onClick={onLoginSubmitClick}>
                로그인하기
              </b>
            </div>
          </div>
        </div>
        <div className={styles.signUpButton}>
          <h2 className={styles.h2} onClick={onSignupClick}>
            회원가입
          </h2>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
