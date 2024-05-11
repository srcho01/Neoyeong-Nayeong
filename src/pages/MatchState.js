import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchState.module.css";
import Logo from "../components/Logo"

import Component1 from "../components/Component1";
import PortalPopup from "../components/PortalPopup";
import Component from "../components/Component";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent3 from "../components/FrameComponent3";


const MatchState = () => {
  const [isFrameOpen, setFrameOpen] = useState(false);
  const [isFrame1Open, setFrame1Open] = useState(false);
  const navigate = useNavigate();

  // const onAntDesignhomeFilledIconClick = useCallback(() => {
  //   navigate("/main-login");
  // }, [navigate]);

  // const openFrame = useCallback(() => {
  //   setFrameOpen(true);
  // }, []);

  // const closeFrame = useCallback(() => {
  //   setFrameOpen(false);
  // }, []);

  // const openFrame1 = useCallback(() => {
  //   setFrame1Open(true);
  // }, []);

  // const closeFrame1 = useCallback(() => {
  //   setFrame1Open(false);
  // }, []);

  const onHomeIconClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={styles.headContainer}>
          <div className={styles.logo}>
            <Logo/>
          </div>
          <div className={styles.title}>
            매칭현황
          </div>
          <img
            className={styles.homeIcon}
            loading="lazy"
            alt="Home"
            src="/home-icon.svg"
            onClick={onHomeIconClick} />
        </div>
      </header>

      <div className={styles.category}>
        등록
      </div>
      <div className={styles.matchingContainer}>
        <div className={styles.matchingWait}>
          <b className={styles.sche}>두산 vs 롯데 4월 7일 14:00</b>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>오프라인</b>
          <b className={styles.status}> 신청 3 </b>
        </div>

        <div className={styles.matchingFinish}>
          <b className={styles.sche}>두산 vs 롯데 4월 7일 14:00</b>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>온라인</b>
          <b className={styles.status}> 모집 완료 </b>
        </div>
      </div>
      <div className={styles.category}>
        신청
      </div>
      <div className={styles.matchingContainer}>
        <div className={styles.matchingWait}>
          <b className={styles.sche}>두산 vs 롯데 4월 7일 14:00</b>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>온라인</b>
          <b className={styles.status}> 대기 </b>
        </div>

        <div className={styles.matchingFinish}>
          <b className={styles.sche}>두산 vs 롯데 4월 7일 14:00</b>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>오프라인</b>
          <b className={styles.status}> 수락 </b>
        </div>
      </div>

    </div>
  );
};

export default MatchState;
