import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainLogout.module.css";

import Datetime from "../components/Datetime";
import Logo from "../components/Logo"

import FrameComponent6 from "../components/FrameComponent6";
import FrameComponent5 from "../components/FrameComponent5";
import FrameComponent4 from "../components/FrameComponent4";


const MainLogout = () => {
  const navigate = useNavigate();
  const currentDateTime = Datetime();

  const onPrayanaWhereInnovationDriveClick = useCallback(() => {
    navigate("/2");
  }, [navigate]);

  const onLoginTextButtonClick = useCallback(() => {
      navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={styles.headContainer}>
          <div className={styles.logo}>
            <Logo/>
          </div>
          <b className={styles.loginTextButton} onClick={onLoginTextButtonClick}> 로그인 </b>
        </div>
        <b className={styles.time}> 지금은 {currentDateTime}입니다 </b>
      </header>

      <div className={styles.main}>
        <FrameComponent6
          onPrayanaWhereInnovationDriveClick={onPrayanaWhereInnovationDriveClick}
        />
        <FrameComponent5 />
        <FrameComponent4 />
      </div>
    </div>
  );
};

export default MainLogout;
