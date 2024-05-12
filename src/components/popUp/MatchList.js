import { useState, useCallback } from "react";
import styles from "./MatchList.module.css";
import MatchProfileCard from "./MatchProfileCard";
import PortalPopup from "../PortalPopup";


const PersonComponent = ({ profileSrc, nickname, openHandler, isAccepted }) => {
  return (
    <div className={styles.personContainer}>
      <img
        className={styles.profileIcon}
        loading="lazy"
        alt=""
        src={profileSrc}
      />
      <div className={styles.nickname}>
        {nickname}
      </div>
      <div className={styles.info} onClick={openHandler}>
        정보
      </div>
      <div className={`${isAccepted ? styles.acceptTrue : styles.acceptFalse}`}>
        {isAccepted ? "수락" : "대기"}
      </div>
    </div>
  );
};

const MatchList = ({onClose}) => {
  const onReturnClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const [isCurrentOpen, setCurrentOpen] = useState(false);
  const open = useCallback(() => {
    setCurrentOpen(true);
  });
  const close = useCallback(() => {
    setCurrentOpen(false);
  });

  const allClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setCurrentOpen(false);
  }, [onClose]);

  const people = [];
  for (let i = 0; i < 15; i++) {
    people.push(
      <PersonComponent
        key={i}
        profileSrc="/default-profile.png"
        nickname={`닉네임${i + 1}`}
        openHandler={open}
        isAccepted={true ? i % 5 == 0 : false}
      />
    );
  }

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
        제목제목 오프라인 제목 제목이 매우 길어요 진짜 길어요 계속 길어요
      </div>

      <div className={styles.text}>
        모집 현황 1 / 2
      </div>
      
      <div className={styles.peopleList}>
        {people}
      </div>

      <div className={styles.submitContainer}>
        <span className={styles.submit} onClick={onReturnClick}>
          완료
        </span>
      </div>

      {isCurrentOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0)"
          placement="Centered"
          onOutsideClick={onReturnClick}
        >
          <MatchProfileCard close={close} allClose={allClose}/>
        </PortalPopup>
      )}

    </div>
  );
};

export default MatchList;