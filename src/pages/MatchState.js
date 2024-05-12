import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchState.module.css";
import Logo from "../components/Logo"

import PortalPopup from "../components/PortalPopup";
import MatchList from "../components/popUp/MatchList"
import MatchResult from "../components/popUp/MatchResult";

const MatchState = () => {
  const [isListOpen, setListOpen] = useState(false);
  const [isResultOpen, setResultOpen] = useState(false);
  const navigate = useNavigate();

  const openList = useCallback(() => {
    setListOpen(true);
  }, []);
  const closeList = useCallback(() => {
    setListOpen(false);
  }, []);

  const openResult = useCallback(() => {
    setResultOpen(true);
  }, []);
  const closeResult = useCallback(() => {
    setResultOpen(false);
  }, []);


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
        <div className={styles.matchingWait} onClick={openList}>
          <b className={styles.sche}>두산 vs 롯데 4월 7일 14:00</b>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>오프라인</b>
          <b className={styles.status}> 신청 3 </b>
        </div>

        <div className={styles.matchingFinish} onClick={openResult}>
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

        <div className={styles.matchingFinish} onClick={openResult}>
          <b className={styles.sche}>두산 vs 롯데 4월 7일 14:00</b>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>오프라인</b>
          <b className={styles.status}> 수락 </b>
        </div>
      </div>

      {isListOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeList}
        >
          <MatchList onClose={closeList} />
        </PortalPopup>
      )}
      {isResultOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeResult}
        >
          <MatchResult onClose={closeResult} />
        </PortalPopup>
      )}

    </div>
  );
};

export default MatchState;
