import { useState, useEffect } from "react";
import styles from "./MainLogoutHead.module.css";
import Logo from "./Logo.js"
import LoginTextButton from "./LoginTextButton.js"
import Datetime from "./Datetime.js";

const MainLogoutHead = () => {
  const currentDateTime = Datetime();

  return (
    <header className={styles.mainLogoutHead}>
      <div className={styles.parent}>
        <div className={styles.h1}>
          <Logo/>
          <LoginTextButton/>
        </div>
        <div className={styles.h2}>
          <b className={styles.b}> 지금은 {currentDateTime}입니다 </b>
        </div>
      </div>
    </header>
  );
};

export default MainLogoutHead;
