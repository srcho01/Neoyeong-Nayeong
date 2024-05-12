import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchBoard.module.css";
import Logo from "../components/Logo"

import PortalPopup from "../components/PortalPopup";
import ReadOffline1 from "../components/popUp/ReadOffline1"
import ReadOnline1 from "../components/popUp/ReadOnline1"
import PostSelectType from "../components/popUp/PostSelectType"


const MatchBoard = () => {
  const [isFrame1Open, setFrame1Open] = useState(false);
  const [isFrame2Open, setFrame2Open] = useState(false);
  const [isPlusOpen, setPlusOpen] = useState(false);
  const navigate = useNavigate();

  const openFrame1 = useCallback(() => {
    setFrame1Open(true);
  }, []);

  const closeFrame1 = useCallback(() => {
    setFrame1Open(false);
  }, []);

  const openFrame2 = useCallback(() => {
    setFrame2Open(true);
  }, []);

  const closeFrame2 = useCallback(() => {
    setFrame2Open(false);
  }, []);

  const openPlus = useCallback(() => {
    setPlusOpen(true);
  }, []);

  const closePlus = useCallback(() => {
    setPlusOpen(false);
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
            매칭 게시판
          </div>
          <img
            className={styles.icon}
            loading="lazy"
            alt="Home"
            src="/home-icon.svg"
            onClick={onHomeIconClick} />
        </div>
      </header>

      <div className={styles.head}>
        <b className={styles.matchInfo1}>두산 vs LG</b>
        <b className={styles.matchInfo2}> 4월 7일 16:00 </b>
        <b className={styles.matchInfo3}> 사직 </b>
        <img
          className={styles.icon}
          loading="lazy"
          alt="Home"
          src="/plus.svg"
          onClick={openPlus} />
      </div>

      <div className={styles.matchingContainer}>
        <div className={styles.matchingPost} onClick={openFrame1}>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>오프라인</b>
        </div>

        <div className={styles.matchingPost} onClick={openFrame2}>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>온라인</b>
        </div>

        {isFrame1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeFrame1}
        >
          <ReadOffline1 onClose={closeFrame1} />
        </PortalPopup>
        )}

        {isFrame2Open && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closeFrame2}
          >
            <ReadOnline1 onClose={closeFrame2} />
          </PortalPopup>
        )}

        {isPlusOpen && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={closePlus}
          >
            <PostSelectType onClose={closePlus} />
          </PortalPopup>
        )}

      </div>
    </div>
  );
};

export default MatchBoard;