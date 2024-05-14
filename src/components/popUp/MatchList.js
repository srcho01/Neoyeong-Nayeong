import { useState, useEffect, useCallback } from "react";
import styles from "./MatchList.module.css";
import MatchProfileCard from "./MatchProfileCard";
import PortalPopup from "../PortalPopup";

import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";


const PersonComponent = ({ profileSrc, userInfo, open, setThisUid, isAccepted }) => {
  const handleClick = () => {
    open(true);
    setThisUid(userInfo.id);
  };

  return (
    <div className={styles.personContainer}>
      <img
        className={styles.profileIcon}
        loading="lazy"
        alt=""
        src={profileSrc}
      />
      <div className={styles.nickname}>
        {userInfo.nickname}
      </div>
      <div className={styles.info} onClick={handleClick}>
        정보
      </div>
      <div className={`${isAccepted ? styles.acceptTrue : styles.acceptFalse}`}>
        {isAccepted ? "수락" : "대기"}
      </div>
    </div>
  );
};

const MatchList = ({onClose, post}) => {
  const onReturnClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const [thisUid, setThisUid] = useState("");
  const [isCurrent, setCurrent] = useState(false);

  const allClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setCurrent(false);
  }, [onClose]);

  
  const [applyList, setApplyList] = useState([]);
  useEffect(() => {
    const people = post.applyUid;
    const temp = [];

    const fetch = async () => {
      try {
        const q = query(collection(db, "UserInfo"), where("__name__", "in", people));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          temp.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setApplyList(temp);

      } catch (error) {
        console.error("Error fetching documents with ID:", error);
      }
    };

    if (people.length > 0) {
      fetch();
    }
  }, []);

  return (
    <div className={styles.popUpFrame}>
      <div className={styles.head}>
        <div className={styles.type}>
          {post.type}
        </div>
        <img
          className={styles.icon}
          onClick={onReturnClick}
          loading="lazy"
          alt=""
          src="/close-icon.svg"
        />
      </div>

      <div className={styles.titleBox}>
        {post.title}
      </div>

      <div className={styles.text}>
        모집 현황 {post.acceptedUid.length} / {post.pnum}
      </div>
      
      <div className={styles.peopleList}>
        {applyList.map((userInfo, index) => (
          <PersonComponent
            key={index}
            profileSrc="/default-profile.png"
            userInfo={userInfo}
            setThisUid={setThisUid}
            open={() => setCurrent(true)}
            isAccepted={post.acceptedUid.includes(userInfo.id)}
          />
        ))}
      </div>

      <div className={styles.submitContainer}>
        <span className={styles.submit} onClick={onReturnClick}>
          완료
        </span>
      </div>

      {isCurrent && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0)"
          placement="Centered"
          onOutsideClick={onReturnClick}
        >
          <MatchProfileCard
            close={() => setCurrent(false)}
            allClose={allClose}
            uid={thisUid}
            post={post}
          />
        </PortalPopup>
      )}

    </div>
  );
};

export default MatchList;