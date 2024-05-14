import { useCallback } from "react";
import styles from "./ReadOffline2.module.css";
import ProfileCard from "./ProfileCard";

import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/userSlice"


const ReadOffline2 = ({close, allClose, post}) => {
  const uid = useSelector(selectUserUid); // redux store uid

  const onBackClick = useCallback(() => {
    if (close) {
      close();
    }
  }, [close]);

  const onReturnClick = useCallback(() => {
    if (allClose) {
      allClose();
    }
  }, [allClose]);

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

      <div className={styles.card}> <ProfileCard post={post} /> </div>

      <div className={styles.submitContainer}>
        <div className={styles.Submit} onClick={onBackClick}>
          이전
        </div>
        <div className={styles.Submit} onClick={onReturnClick}>
          신청
        </div>
      </div>
    </div>
  );
};

export default ReadOffline2;
