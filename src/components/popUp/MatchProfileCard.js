import { useCallback } from "react";
import styles from "./MatchProfileCard.module.css";
import ProfileCard from "./ProfileCard";

const MatchProfileCard = ({close, allClose}) => {
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
        <div className={styles.title}>
          프로필
        </div>
        <img
          className={styles.icon}
          onClick={onReturnClick}
          loading="lazy"
          alt=""
          src="/close-icon.svg"
        />
      </div>

      <div className={styles.card}> <ProfileCard /> </div>

      <div className={styles.submitContainer}>
        <span className={styles.submit} onClick={onBackClick}>
          이전
        </span>
        <span className={styles.submit} onClick={onReturnClick}>
          수락
        </span>
      </div>
    </div>
  );
};

export default MatchProfileCard;
