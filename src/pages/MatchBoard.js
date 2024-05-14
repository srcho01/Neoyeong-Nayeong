import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MatchBoard.module.css";
import Logo from "../components/Logo"

import PortalPopup from "../components/PortalPopup";
import ReadOffline1 from "../components/popUp/ReadOffline1"
import ReadOnline1 from "../components/popUp/ReadOnline1"
import PostSelectType from "../components/popUp/PostSelectType"


const MatchBoard = () => {
  // Get query string
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const params = ['id', 'team1', 'team2', 'month', 'day', 'hour', 'minute', 'loc'];
  const matchInfo = {};

  params.forEach(param => {
    if (['hour', 'minute'].includes(param)) {
      const num = parseInt(queryParams.get(param));  
      matchInfo[param] = num < 9 ? `0${num}` : num.toString();
    } else {
      matchInfo[param] = queryParams.get(param);
    }
  });

  const [offline, setOffline] = useState(false);
  const [online, setOnline] = useState(false);
  const [plus, setPlus] = useState(false);


  const navigate = useNavigate();
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
        <b className={styles.matchInfo1}> {matchInfo.team1} vs {matchInfo.team2} </b>
        <b className={styles.matchInfo2}> {matchInfo.month}월 {matchInfo.day}일 {matchInfo.hour}:{matchInfo.minute} </b>
        <b className={styles.matchInfo3}> 사직 </b>
        <img
          className={styles.icon}
          loading="lazy"
          alt="Home"
          src="/plus.svg"
          onClick={() => setPlus(true)} />
      </div>

      <div className={styles.matchingContainer}>
        <div className={styles.matchingPost} onClick={() => setOffline(true)}>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>오프라인</b>
        </div>

        <div className={styles.matchingPost} onClick={() => setOnline(true)}>
          <b className={styles.t}>저랑 야구장 같이 가실 분 2명 구합니다! </b>
          <b className={styles.type}>온라인</b>
        </div>

        {offline && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={() => setOffline(false)}
        >
          <ReadOffline1 onClose={() => setOffline(false)} />
        </PortalPopup>
        )}

        {online && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={() => setOnline(false)}
          >
            <ReadOnline1 onClose={() => setOnline(false)} />
          </PortalPopup>
        )}

        {plus && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={() => setPlus(false)}
          >
            <PostSelectType onClose={() => setPlus(false)} />
          </PortalPopup>
        )}
      </div>
    </div>
  );
};

export default MatchBoard;