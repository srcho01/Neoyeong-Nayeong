import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";

const MyPage = () => {
  const navigate = useNavigate();

  const onHomeIconClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const onNicknameCheckClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const [sportOpen, setSportOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const toggleSport = () => {
    setSportOpen(!sportOpen);
  };
  const toggleTeam = () => {
    setTeamOpen(!teamOpen);
  };

  return (
    <div className={styles.fullScreen}>
      <div className={styles.frame}>
        <header className={styles.header}>
          <h1 className={styles.title}>마이페이지</h1>
          <img
            className={styles.homeIcon}
            loading="lazy"
            alt="Home"
            src="/home-icon.svg"
            onClick={onHomeIconClick} />
        </header>

        <div className={styles.profileContainer}>
          <img
            className={styles.profileIcon}
            loading="lazy"
            alt=""
            src="/default-profile.png"
          />
        </div>
        
        <div className={styles.info}>
          <div className={styles.infoBox}>
            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>이메일</b>
              <input
                className={styles.inputDisabled}
                value="원래이메일.kookmin.ac.kr"
                disabled
              />
            </div>
            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>이름</b>
              <input
                className={styles.inputDisabled}
                value="홍길동"
                disabled
              />
            </div>
            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>성별</b>
              <input
                className={styles.inputDisabled}
                value="남자"
                disabled
              />
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 닉네임 </b>
              <div className={styles.nickname}>
                <input
                  type="text"
                  className={styles.nicknameInput}
                  placeholder="물에빠진너구리"
                />
                <b className={styles.dupCheck} onClick={onNicknameCheckClick}> 중복확인 </b>
              </div>
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠 </b>
              <img
                className={styles.plus}
                loading="lazy"
                alt=""
                src="/plus.svg"
                onClick={toggleSport}
              />
              {sportOpen && (
                <ul className={styles.list}>
                  <li>야구</li>
                  <li>축구</li>
                  <li>LoL</li>
                </ul>
              )}
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠팀 </b>
              <img
                className={styles.plus}
                loading="lazy"
                alt=""
                src="/plus.svg"
                onClick={toggleTeam}
              />
              {teamOpen && (
                <ul className={styles.list}>
                  <li>야구 - LG Twins</li>
                  <li>야구 - KIA Tigers</li>
                  <li>축구 - 전북 </li>
                  <li>LoL - SKT T1</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
