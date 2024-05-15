import React, { useCallback } from 'react';
import styles from './Logo.module.css';
import { useNavigate } from "react-router-dom";


const Logo = ({isLogout}) => {
  const navigate = useNavigate();
  const logoClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  return (
    <>
    {isLogout ? (
      <h1 className={styles.h}>
        <span className={styles.neona}>너</span>
        <span className={styles.yeong}>영</span>
        <span className={styles.neona}>나</span>
        <span className={styles.yeong}>영</span>
      </h1>
    ) : (
      <h1 className={styles.h} onClick={logoClick} style={{cursor: "pointer"}}>
        <span className={styles.neona}>너</span>
        <span className={styles.yeong}>영</span>
        <span className={styles.neona}>나</span>
        <span className={styles.yeong}>영</span>
      </h1>
    )}
  </>
  );
};

export default Logo;
