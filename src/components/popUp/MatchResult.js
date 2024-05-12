import { useState, useCallback } from "react";
import styles from "./MatchResult.module.css";
import PortalPopup from "../PortalPopup";


const PersonComponent = ({ profileSrc, nickname, email }) => {
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
      <div className={styles.email}>
        {email}
      </div>
    </div>
  );
};

const MatchResult = ({onClose}) => {
  const onReturnClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const people = [];
  for (let i = 0; i < 15; i++) {
    people.push(
      <PersonComponent
        key={i}
        profileSrc="/default-profile.png"
        nickname={`닉네임${i + 1}`}
        email="qwerty.kookmin.ac.kr"
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

      <div className={styles.peopleList}>
        {people}
      </div>
    </div>
  );
};

export default MatchResult;