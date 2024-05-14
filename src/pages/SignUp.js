import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { app, db } from '../firebase';

import styles from "./SignUp.module.css";

import getUserInput from "../hooks/getUserInput"
import DropDown from "../components/Dropdown";
import { SPORT, GENDER, TEAM } from '../data/dropdownData';


function emailCheck(email_address) {
	const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if (!email_regex.test(email_address)) { 
		return false; 
	} else {
		return true;
	}
}

function passwordCheck(pw1, pw2) {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  // 비밀번호는 영어, 숫자, 특수기호를 모두 포함해야 하며 8자 이상이어야 합니다.
  if (pw1 !== pw2) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  } else if (!regex.test(pw1)) {
    alert("비밀번호는 영문, 숫자, 특수기호를 모두 포함하고 8자 이상이어야 합니다.");
    return false;
  } else {
    return true;
  }
}


const auth = getAuth(app);

// check variables
let isCheckEmail = false;
let isCheckNickname = false;
let lastCheckEmail = "";
let lastCheckNickname = "";

const SignUp = () => {
  // useStates
  const [email, setEmail, changeEmail] = getUserInput("");
  const [password1, setPassword1, changePassword1] = getUserInput("");
  const [password2, setPassword2, changePassword2] = getUserInput("");
  const [name, setName, changeName] = getUserInput("");
  const [gender, setGender, changeGender] = getUserInput("");
  let [nickname, setNickname, changeNickname] = getUserInput("");
  const [sport, setSport, changeSport] = getUserInput([]);
  const [team, setTeam, changeTeam] = getUserInput([]);

  // navigate callbacks
  const navigate = useNavigate();

  const onHomeIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // check button callbacks
  const onEmailCheckClick = useCallback(async () => {
    try {
      if (!emailCheck(email)) {
        isCheckEmail = false;
        return alert("유효하지 않은 이메일 형식입니다");
      }

      const usersRef = collection(db, 'UserInfo');
      const q = query(usersRef, where('email', '==', email));
      const queryResult = await getDocs(q);
      
      if (queryResult.empty) {
        isCheckEmail = true;
        lastCheckEmail = email;
        return alert('사용 가능한 이메일입니다.');
      } else {
        isCheckEmail = false;
        return alert('해당 이메일은 이미 사용 중입니다.');
      }
    } catch (error) {
      console.error('이메일 중복 확인 오류:', error.message);
    }
  }, [email]);

  const onNicknameCheckClick = useCallback(async () => {
    try {
      if (nickname === "") {
        nickname = name;
        setNickname(name);
      } else if (nickname.length > 10) {
        isCheckNickname = false;
        return alert("닉네임은 10자 이하여야 합니다.");
      }

      const usersRef = collection(db, 'UserInfo');
      const q = query(usersRef, where('nickname', '==', nickname));
      const queryResult = await getDocs(q);
      
      if (queryResult.empty) {
        isCheckNickname = true;
        lastCheckNickname = nickname;
        return alert('사용 가능한 닉네임입니다.');
      } else {
        return alert('해당 닉네임은 이미 사용 중입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 오류:', error.message);
    }
  }, [name, nickname]);

  // submit callback
  const onSubmitClick = useCallback(async () => {
    try {
      if (!isCheckEmail || lastCheckEmail !== email) {
        return alert("이메일 확인을 해주세요");
      } else if (name === "") {
        return alert("이름을 입력 해주세요");
      } else if (password1 === "") {
        return alert("비밀번호를 입력 해주세요");
      } else if (password2 === "") {
        return alert("비밀번호 확인을 입력 해주세요");
      } 

      if (!passwordCheck(password1, password2)) return;
      
      if (gender === "") {
        return alert("성별을 선택해 주세요");
      }

      if (!isCheckNickname || lastCheckNickname !== nickname) {
        // console.log(isCheckNickname);
        // console.log(lastCheckNickname);
        // console.log(nickname);
        return alert("닉네임 확인을 해주세요");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password2);
      const user = userCredential.user;

      await setDoc(doc(db, "UserInfo", user.uid), {
        email: email,
        name: name,
        gender: gender,
        nickname: (nickname === "" ? name : nickname),
        sport: sport && sport.length > 0 ? sport: null,
        team: team && team.length > 0 ? team: null,
        write: [],
        apply: [],
      });
      
      console.log("회원가입 성공:", user.uid);
      
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error.message);
    }
  }, [navigate, email, password1, password2, name, gender, nickname, sport, team]);

  // array data handler
  const handleSport = e => {
    const { value } = e.target;
    if (!sport.includes(value)) {
      setSport([...sport, value]);
    }
  };
  const handleTeam = e => {
    const { value } = e.target;
    if (!team.includes(value)) {
      setTeam([...team, value]);
    }
  };

  return (
    <div className={styles.fullScreen}>
      <div className={styles.frame}>
        <header className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
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
              <b className={styles.infoTitle}> 이메일 </b>
              <div className={styles.noneDup}>
                <input
                  type="text"
                  className={styles.noneDupInput}
                  onChange={changeEmail}
                />
                <b className={styles.dupCheck} onClick={onEmailCheckClick}> 확인 </b>
              </div>
            </div>
            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>이름</b>
              <input
                className={styles.input}
                type="text"
                onChange={changeName}
              />
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>비밀번호</b>
              <input
                className={styles.input}
                type="password"
                onChange={changePassword1}
              />
            </div>
            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>비밀번호 확인</b>
              <input
                className={styles.input}
                type="password"
                onChange={changePassword2}
              />
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}>성별</b>
              <DropDown
                list={GENDER}
                data={gender}
                onChange={changeGender}
              />
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 닉네임 </b>
              <div className={styles.noneDup}>
                <input
                  type="text"
                  className={styles.noneDupInput}
                  onChange={changeNickname}
                  placeholder={name}
                />
                <b className={styles.dupCheck} onClick={onNicknameCheckClick}> 확인 </b>
              </div>
            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠 (선택) </b>
              <div className={styles.listContainer}>
                {sport.length === 0 ? '없음' : sport.map((value, index) => (
                  <div key={index} className={styles.list}>
                    {SPORT.find(sport => sport.value === value)?.name}
                    <button 
                      className={styles.delBtn}
                      onClick={() => setSport(prev => prev.filter(item => item !== value))}>
                    삭제</button>
                  </div>
                ))}
              </div>
              <DropDown
                list={SPORT}
                data={sport}
                onChange={handleSport}
              />

            </div>

            <div className={styles.infoContainer}>
              <b className={styles.infoTitle}> 관심 스포츠팀 (선택) </b>
              <div className={styles.listContainer}>
                {team.length === 0 ? '없음' : team.map((value, index) => (
                  <div key={index} className={styles.list}>
                    {TEAM.find(sport => sport.value === value)?.name}
                    <button 
                      className={styles.delBtn}
                      onClick={() => setTeam(prev => prev.filter(item => item !== value))}>
                    삭제</button>
                  </div>
                ))}
              </div>
              <DropDown
                list={TEAM}
                data={team}
                onChange={handleTeam}
              />
            </div>
          </div>

          <div className={styles.Submit} onClick={onSubmitClick}>
            가입하기
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
