import { useCallback } from "react";
import styles from "./ReadOnline2.module.css";
import ProfileCard from "./ProfileCard";

const ReadOnline2 = ({close, allClose}) => {
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
          온라인
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
        제목제목 온라인 제목 제목이 매우 길어요 진짜 길어요 계속 길어요
      </div>

      <div className={styles.card}> <ProfileCard /> </div>

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

export default ReadOnline2;
