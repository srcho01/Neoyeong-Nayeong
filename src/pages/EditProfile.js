import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, getDocs, setDoc, collection, query, where } from "firebase/firestore";

import { useSelector } from "react-redux";
import { selectUserUid } from "../store/userSlice"

import styles from "./EditProfile.module.css";
import Logo from "../components/Logo";

import DropDown from "../components/Dropdown";
import { SPORT, TEAM } from '../data/dropdownData';


let isCheckNickname = true;

const EditProfile = () => {
  const navigate = useNavigate();
  
  // Get user info
  const uid = useSelector(selectUserUid); // redux store uid

  // user info useState
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    gender: "",
    nickname: "",
    sport: [],
    team: [],
    write: [],
    apply: [],
  });

  const [lastCheckNickname, setLastCheckNickname] = useState("");
  const [prevNickname, setPrevNickname] = useState("");
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const docRef = doc(db, "UserInfo", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserInfo(data);
          setLastCheckNickname(data.nickname);
          setPrevNickname(data.nickname);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (uid) {
      fetchUserInfo();
    }
  }, [db, uid]);

  const onHomeIconClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const onNicknameCheckClick = useCallback(async () => {
    try {
      if (userInfo.nickname.length > 10) {
        isCheckNickname = false;
        return alert("닉네임은 10자 이하여야 합니다.");
      }

      const usersRef = collection(db, 'UserInfo');
      const q = query(usersRef, where('nickname', '==', userInfo.nickname));
      const queryResult = await getDocs(q);
      
      if (queryResult.empty || lastCheckNickname === userInfo.nickname || prevNickname === userInfo.nickname) {
        isCheckNickname = true;
        setLastCheckNickname(userInfo.nickname);
        return alert('사용 가능한 닉네임입니다.');
      } else {
        isCheckNickname = false;
        return alert('해당 닉네임은 이미 사용 중입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error.message);
    }
  }, [userInfo.name, userInfo.nickname]);


  const onSubmitClick = useCallback(async () => {
    if (!isCheckNickname) {
      return alert("닉네임 확인을 해주세요");
    }

    setPrevNickname(userInfo.nickname);
    isCheckNickname = true;
    await setDoc(doc(db, "UserInfo", uid), userInfo);

    console.log("정보 업데이트 성공:", userInfo);
    alert("성공적으로 변경되었습니다.");

  }, [userInfo, uid]);

  const changeNickname = useCallback((e) => {
    let { value } = e.target;
    
    if (value === "") {
      value = prevNickname;
      isCheckNickname = true;
    } else {
      isCheckNickname = false;
    }

    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      nickname: value
    }));

  }, [userInfo.name, prevNickname]);

  const addSport = e => {
    const { value } = e.target;
    if (!userInfo.sport.includes(value)) {
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        sport: [...prevUserInfo.sport, value]
      }));
    }
  };
  const deleteSport = (value) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      sport: prevUserInfo.sport.filter(item => item !== value)
    }));
  };
  
  const addTeam = e => {
    const { value } = e.target;
    if (!userInfo.team.includes(value)) {
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        team: [...prevUserInfo.team, value]
      }));
    }
  };
  const deleteTeam = (value) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      team: prevUserInfo.team.filter(item => item !== value)
    }));
  };

  return (
    <div className={styles.fullScreen}>
      <div className={styles.frame}>
        <header className={styles.header}>
          <Logo isLogout={false} />
          <h1 className={styles.title}> 프로필 수정 </h1>
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
                value={userInfo.email}
                disabled
              />
            </div>
            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>이름</b>
              <input
                className={styles.inputDisabled}
                value={userInfo.name}
                disabled
              />
            </div>
            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>성별</b>
              <input
                className={styles.inputDisabled}
                value={userInfo.gender}
                disabled
              />
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 닉네임 </b>
              <div className={styles.noneDup}>
                <input
                  type="text"
                  className={styles.noneDupInput}
                  onChange={changeNickname}
                  placeholder={userInfo.nickname}
                />
                <b className={styles.dupCheck} onClick={onNicknameCheckClick}> 확인 </b>
              </div>
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠 (선택) </b>
              <div className={styles.listContainer}>
                {userInfo.sport.length === 0 ? '없음' : userInfo.sport.map((value, index) => (
                  <div key={index} className={styles.list}>
                    {SPORT.find(sport => sport.value === value)?.name}
                    <button 
                      className={styles.delBtn}
                      onClick={() => deleteSport(value)}>
                    삭제</button>
                  </div>
                ))}
              </div>
              <DropDown
                list={SPORT}
                data={userInfo.sport}
                onChange={addSport}
              />
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠팀 (선택) </b>
              <div className={styles.listContainer}>
                {userInfo.team.length === 0 ? '없음' : userInfo.team.map((value, index) => (
                  <div key={index} className={styles.list}>
                    {TEAM.find(team => team.value === value)?.name}
                    <button 
                      className={styles.delBtn}
                      onClick={() => deleteTeam(value)}>
                    삭제</button>
                  </div>
                ))}
              </div>
              <DropDown
                list={TEAM}
                data={userInfo.team}
                onChange={addTeam}
              />
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

export default EditProfile;
