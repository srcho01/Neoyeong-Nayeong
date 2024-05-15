import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainLogout.module.css";

import Datetime from "../components/Datetime";
import Logo from "../components/Logo"
import MainBody from "../components/MainBody"


const MainLogout = () => {
  const navigate = useNavigate();
  const currentDateTime = Datetime();

  const onLoginTextButtonClick = useCallback(() => {
      navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={styles.headContainer}>
          <div className={styles.logo}>
            <Logo isLogout={true}/>
          </div>
          <b className={styles.loginTextButton} onClick={onLoginTextButtonClick}> LOGIN </b>
        </div>
        <b className={styles.time}> 지금은 {currentDateTime}입니다 </b>
      </header>

      <MainBody isLogout={true} />

    </div>
  );
};

export default MainLogout;
