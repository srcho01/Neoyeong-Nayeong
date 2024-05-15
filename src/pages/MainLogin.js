import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainLogin.module.css";

import Datetime from "../components/Datetime";
import Logo from "../components/Logo"
import MainBody from "../components/MainBody"

import { useDispatch } from 'react-redux';
import { userSlice } from '../store/userSlice';
import { useSelector } from "react-redux";
import { selectUserUid } from "../store/userSlice"

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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

  const onProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);


  const uid = useSelector(selectUserUid); // redux store uid
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const docRef = doc(db, "UserInfo", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setNickname(data.nickname);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (uid) {
      fetchUserInfo();
    }

  }, [uid]);

  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={styles.headContainer}>
          <div className={styles.logo}>
            <Logo isLogout={false}/>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.text} onClick={onProfile}> {nickname} </div>
            <div className={styles.text} onClick={onMypage} > MYPAGE </div>
            <div className={styles.text} onClick={onLogout} > LOGOUT </div>
          </div>
        </div>
        <b className={styles.time}> 지금은 {currentDateTime}입니다 </b>
      </header>

      <MainBody isLogout={false} />

      <div className={styles.main}>
      </div>
    </div>
  );
};

export default MainLogin;
