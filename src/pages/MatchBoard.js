import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MatchBoard.module.css";
import Logo from "../components/Logo"

import PortalPopup from "../components/PortalPopup";
import ReadOffline1 from "../components/popUp/ReadOffline1"
import ReadOnline1 from "../components/popUp/ReadOnline1"
import PostSelectType from "../components/popUp/PostSelectType"

import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";


const MakeCard = ({post, setter, setThisPost}) => {
  const handleCardClick = () => {
    setter(true);
    setThisPost(post);
  };

  return (
    <div className={styles.matchingPost} onClick={handleCardClick}>
      <b className={styles.t}> {post.title} </b>
      <b className={styles.type}> {post.type} </b>
    </div>
  );
};

const MatchBoard = () => {
  // Get query string
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const params = ['sport', 'id', 'team1', 'team2', 'month', 'day', 'hour', 'minute', 'loc'];
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
  const [thisPost, setThisPost] = useState("");

  const key = `${matchInfo.sport}${matchInfo.id}`;

  const navigate = useNavigate();
  const onHomeIconClick = useCallback(() => {
    navigate("/main/login");
  }, [navigate]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const docSnap = await getDocs(collection(db, "Board", `${key}`, "Posts"));
        const fetchedPosts = [];
  
        docSnap.forEach(doc => {
          fetchedPosts.push({
            id: doc.id,
            matchId: key,
            ...doc.data()
          });
        });
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
  
    fetchPosts();
  }, []);

  return (
    <div className={styles.frame}>
      <header className={styles.header}>
        <div className={styles.headContainer}>
          <div className={styles.logo}>
            <Logo isLogout={false}/>
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
        <b className={styles.matchInfo3}> {matchInfo.loc} </b>
        <img
          className={styles.icon}
          loading="lazy"
          alt="Home"
          src="/plus.svg"
          onClick={() => setPlus(true)} />
      </div>

      <div className={styles.matchingContainer}>
        {posts.map((post, index) => (
          <MakeCard
            key={index}
            setter={() => {
              post.type === "온라인" ? setOnline(true) : setOffline(true);
            }}
            post={post}
            setThisPost={setThisPost}
          />
        ))}

        {offline && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={() => setOffline(false)}
          >
            <ReadOffline1 
              onClose={() => setOffline(false)}
              post={thisPost}
            />
          </PortalPopup>
        )}

        {online && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={() => setOnline(false)}
          >
            <ReadOnline1 
              onClose={() => setOnline(false)}
              post={thisPost}
            />
          </PortalPopup>
        )}

        {plus && (
          <PortalPopup
            overlayColor="rgba(113, 113, 113, 0.3)"
            placement="Centered"
            onOutsideClick={() => setPlus(false)}
          >
            <PostSelectType onClose={() => setPlus(false)} match={key} />
          </PortalPopup>
        )}
      </div>
    </div>
  );
};

export default MatchBoard;