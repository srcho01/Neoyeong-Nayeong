import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const onHomeIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.div}>
      <img
        className={styles.homeIcon}
        loading="lazy"
        alt=""
        src="/antdesignhomefilled.svg"
        onClick={onHomeIconClick}
      />
      <LoginPage />
    </div>
  );
};

export default Login;
