import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainLogin.module.css";

import Datetime from "../components/Datetime";
import Logo from "../components/Logo"
import MainBody from "../components/MainBody"

import { useDispatch } from 'react-redux';
import { userSlice } from '../store/userSlice';

const MainLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentDateTime = Datetime();

  const onLogout = useCallback(() => {
    navigate("/");
    
    // redux delete
    dispatch(userSlice.actions.logout());

  }, [navigate]);

  const onMypage = useCallback(() => {
    navigate("/mypage");
  }, [navigate]);

  const onMatch = useCallback(() => {
    navigate("/match/state");
  }, [navigate]);

  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={styles.headContainer}>
          <div className={styles.logo}>
            <Logo/>
          </div>
          <div className={styles.imageContainer}>
            <img src="/logout.svg" alt="Logout" className={styles.image} onClick={onLogout}/>
            <img src="/profile.svg" alt="MyPage" className={styles.image} onClick={onMypage} />
            <img src="/match.svg" alt="Matching" className={styles.image} onClick={onMatch}/>
          </div>
        </div>
        <b className={styles.time}> 지금은 {currentDateTime}입니다 </b>
      </header>

      <MainBody />

      <div className={styles.main}>
      </div>
    </div>
  );
};

export default MainLogin;
