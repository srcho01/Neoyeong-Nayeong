import { useState, useEffect, useCallback } from "react";
import styles from "./MatchResult.module.css";

import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";


const PersonComponent = ({ profileSrc, userInfo }) => {
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
      <div className={styles.email}>
        {userInfo.email}
      </div>
    </div>
  );
};

const MatchResult = ({onClose, post}) => {
  const onReturnClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const [acceptList, setApplyList] = useState([]);
  useEffect(() => {
    const people = post.acceptedUid;
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
          오프라인
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

      <div className={styles.peopleList}>
        {acceptList.map((userInfo, index) => (
          <PersonComponent
            key={index}
            profileSrc="/default-profile.png"
            userInfo={userInfo}
          />
        ))}
      </div>

      <div className={styles.submitContainer}>
        <span className={styles.submit} onClick={onReturnClick}>
          완료
        </span>
      </div>

    </div>
  );
};

export default MatchResult;