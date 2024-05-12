import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import styles from "./MyPage.module.css";

const Dropdown = styled.select`
  padding: 8px;
  margin-left: 10px;
  border-radius: 10px;
  border: 3px solid black;
  width: 100px;
  height: 40px;
  font-size: 16px;
  color: black;
`;

const SPORT = [
  {id: 1, name: '야구', value: '야구'},
  {id: 2, name: '축구', value: '축구'},
  {id: 3, name: 'LoL', value: 'LoL'},
]


const MyPage = () => {
  const navigate = useNavigate();

  const onHomeIconClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const onNicknameCheckClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const onSubmitClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);


  const [selectSport, setSport] = useState([]);
  const handleSport = e => {
    const { value } = e.target;
    if (!selectSport.includes(value)) {
      setSport([...selectSport, value]);
    }
  };

  const [selectTeam, setTeam] = useState([]);
  const handleTeam = e => {
    const { value } = e.target;
    if (!selectTeam.includes(value)) {
      setTeam([...selectTeam, value]);
    }
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
              <div className={styles.noneDup}>
                <input
                  type="text"
                  className={styles.noneDupInput}
                  placeholder="홍길동"
                />
                <b className={styles.dupCheck} onClick={onNicknameCheckClick}> 중복확인 </b>
              </div>
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠 (선택) </b>
              <div className={styles.listContainer}>
                {selectSport.length === 0 ? '없음' : selectSport.map((value, index) => (
                  <div key={index} className={styles.list}>
                    {SPORT.find(sport => sport.value === value)?.name}
                    <button 
                      className={styles.delBtn}
                      onClick={() => setSport(prev => prev.filter(item => item !== value))}>
                    삭제</button>
                  </div>
                ))}
              </div>
              <Dropdown value="" onChange={handleSport}>
                <option value="" disabled>선택</option>
                {SPORT.map((sport) => (
                  <option key={sport.id} value={sport.value}>
                    {sport.name}
                  </option>
                ))}
              </Dropdown>

            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠팀 (선택) </b>
              <div className={styles.listContainer}>
                {selectTeam.length === 0 ? '없음' : selectTeam.map((value, index) => (
                  <div key={index} className={styles.list}>
                    {SPORT.find(sport => sport.value === value)?.name}
                    <button 
                      className={styles.delBtn}
                      onClick={() => setTeam(prev => prev.filter(item => item !== value))}>
                    삭제</button>
                  </div>
                ))}
              </div>
              <Dropdown value="" onChange={handleTeam}>
                <option value="" disabled>선택</option>
                {SPORT.map((sport) => (
                  <option key={sport.id} value={sport.value}>
                    {sport.name}
                  </option>
                ))}
              </Dropdown>
            </div>
          </div>

          <div className={styles.Submit} onClick={onSubmitClick}>
            수정하기
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyPage;
