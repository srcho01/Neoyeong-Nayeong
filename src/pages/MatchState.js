import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchState.module.css";
import Logo from "../components/Logo"

import PortalPopup from "../components/PortalPopup";
import MatchList from "../components/popUp/MatchList"
import MatchResult from "../components/popUp/MatchResult";

import { useSelector } from "react-redux";
import { selectUserUid } from "../store/userSlice"

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import baseball from "../data/kbo"
import soccer from "../data/kleague"
import lol from "../data/lck"


const RegisterComponent = ({ setList, setResult, setThisPost, postInfo }) => {
  const matchId = postInfo.split("_")[0];
  const postId = postInfo.split("_")[1];

  const [p, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "Board", `${matchId}`, "Posts", `${postId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let data = docSnap.data();
          data = {
            id: docSnap.id,
            ...data
          }
          setPost(data);
          setThisPost(data);
        } else {
          console.log(matchId, postId);
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (postInfo) {
      fetchPost();
    }
  }, [postInfo, matchId, postId]);

  if (!p) {
    return null; // p가 null인 경우에는 아무것도 렌더링하지 않음
  }

  // match data
  let data = null;
  switch (matchId[0]) {
    case "b":
      data = baseball;
      break;
    case "s":
      data = soccer;
      break;
    case "l":
      data = lol;
      break;
    default:
      data = null;
      break;
  }
  data = data[matchId.slice(1)];
  
  if (p.pnum > p.acceptedUid.length) {
    const handleClick = () => {
      setList(true);
      setThisPost(p);
    };
    return (
      <div className={styles.matchingWait} onClick={handleClick}>
        <b className={styles.sche}> {data.team1} vs {data.team2} {data.month}월 {data.day}일 {data.hour < 9 ? `0${data.hour}` : data.hour}:{data.minute < 9 ? `0${data.minute}` : data.minute} </b>
        <b className={styles.t}> {p.title} </b>
        <b className={styles.type}> {p.type} </b>
        <b className={styles.status}> 신청 {p.applyUid.length} </b>
      </div>
    );
  } else {
    const handleClick = () => {
      setResult(true);
      setThisPost(p);
    };
    return (
      <div className={styles.matchingFinish} onClick={handleClick}>
        <b className={styles.sche}> {data.team1} vs {data.team2} {data.month}월 {data.day}일 {data.hour < 9 ? `0${data.hour}` : data.hour}:{data.minute < 9 ? `0${data.minute}` : data.minute} </b>
        <b className={styles.t}> {p.title} </b>
        <b className={styles.type}> {p.type} </b>
        <b className={styles.status}> 모집 완료 </b>
      </div>
    );
  }
};


const ApplyComponent = ({ setResult, postInfo, setThisPost }) => {
  const matchId = postInfo.split("_")[0];
  const postId = postInfo.split("_")[1];

  const [p, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "Board", `${matchId}`, "Posts", `${postId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let data = docSnap.data();
          data = {
            id: docSnap.id,
            ...data
          }
          setPost(data);
          setThisPost(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (postInfo) {
      fetchPost();
    }
  }, [postInfo, matchId, postId]);

  if (!p) {
    return null; // p가 null인 경우에는 아무것도 렌더링하지 않음
  }

  // match data
  let data = null;
  switch (matchId[0]) {
    case "b":
      data = baseball;
      break;
    case "s":
      data = soccer;
      break;
    case "l":
      data = lol;
      break;
    default:
      data = null;
      break;
  }
  data = data[matchId.slice(1)];

  if (p.pnum > p.acceptedUid.length) {
    return (
      <div className={styles.matchingWait} style={{ cursor: 'auto' }}>
        <b className={styles.sche}> {data.team1} vs {data.team2} {data.month}월 {data.day}일 {data.hour < 9 ? `0${data.hour}` : data.hour}:{data.minute < 9 ? `0${data.minute}` : data.minute} </b>
        <b className={styles.t}> {p.title} </b>
        <b className={styles.type}> {p.type} </b>
        <b className={styles.status}> 대기 </b>
      </div>
    );
  } else {
    const handleClick = () => {
      setResult(true);
      setThisPost(p);
    };
    return (
      <div className={styles.matchingFinish} onClick={handleClick}>
        <b className={styles.sche}> {data.team1} vs {data.team2} {data.month}월 {data.day}일 {data.hour < 9 ? `0${data.hour}` : data.hour}:{data.minute < 9 ? `0${data.minute}` : data.minute} </b>
        <b className={styles.t}> {p.title} </b>
        <b className={styles.type}> {p.type} </b>
        <b className={styles.status}> 수락 </b>
      </div>
    );
  }
};

const MatchState = () => {
  const uid = useSelector(selectUserUid); // redux store uid

  const [userInfo, setUserInfo] = useState({
    write: [],
    apply: []
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const docRef = doc(db, "UserInfo", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserInfo(data);
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

  }, [uid]);

  const [isList, setList] = useState(false);
  const [isResult, setResult] = useState(false);
  const navigate = useNavigate();


  const onHomeIconClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const [thisPost, setThisPost] = useState("");

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
        {userInfo.write.map((matchId, index) => (
          <RegisterComponent
            key={index}
            setList={() => {setList(true)}}
            setResult={() => {setResult(true)}}
            setThisPost={setThisPost}
            postInfo={matchId}
          />
        ))}
      </div>

      <div className={styles.category}>
        신청
      </div>
      <div className={styles.matchingContainer}>
        {userInfo.apply.map((matchId, index) => (
          <ApplyComponent
            key={index}
            setResult={() => {setResult(true)}}
            setThisPost={setThisPost}
            postInfo={matchId}
          />
        ))}
      </div>

      {isList && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={() => {setList(false)}}
        >
          <MatchList onClose={() => {setList(false)}} post={thisPost} />
        </PortalPopup>
      )}
      {isResult && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={() => {setResult(false)}}
        >
          <MatchResult onClose={() => {setResult(false)}} post={thisPost} />
        </PortalPopup>
      )}

    </div>
  );
};

export default MatchState;
