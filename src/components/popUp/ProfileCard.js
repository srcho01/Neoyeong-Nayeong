import styles from "./ProfileCard.module.css";

import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";


const ProfileCard = ({uid}) => {
  // user info useState
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    gender: "",
    nickname: "",
    sport: [],
    team: []
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const docRef = doc(db, "UserInfo", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserInfo(data);
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

  const renderArray = (arr) => {
    return arr.join(', ');
  };

  return (
    <div className={styles.popUpFrame}>
      <div className={styles.profileContainer}>
        <img
            className={styles.profileImage}
            loading="lazy"
            alt=""
            src="/default-profile.png"
        />
        <b className={styles.name}> {userInfo.nickname} </b>
        <div className={styles.info}>
          <div className={styles.infoContainer}>
            <div className={styles.li}> 성별 </div>
            <div className={styles.li}> {userInfo.gender} </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.li}> 관심 스포츠 </div>
            <div className={styles.li}> {userInfo.sport.length > 0 ? renderArray(userInfo.sport) : "없음"} </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.li}> 관심 스포팀 </div>
            <div className={styles.team}>
              {userInfo.team.length === 0 ? (
                <div className={styles.li}> 없음 </div>
              ) : (
                userInfo.team.map((team, index) => (
                  <div key={index} className={styles.li}>{team}</div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;