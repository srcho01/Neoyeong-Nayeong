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

      <div className={styles.Submit} onClick={onBackClick}>
        수락
      </div>
    </div>
  );
};

export default MatchProfileCard;
