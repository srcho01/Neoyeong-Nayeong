import { useCallback } from "react";
import styles from "./ReadOffline2.module.css";
import ProfileCard from "./ProfileCard";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";

import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/userSlice"


const ReadOffline2 = ({close, allClose, post}) => {
  const uid = useSelector(selectUserUid); // redux store uid

  const onApplyClick = useCallback(async() => {
    try {
      if (post.acceptedUid.length === post.pnum + 1) {
        alert("모집이 마감된 게시글입니다");
        return;
      }
      
      // write post
      const ref = doc(db, "Board", `${post.matchId}`, "Posts", `${post.id}`);
      await updateDoc(ref, {
        applyUid: arrayUnion(uid)
      });

      // write user info
      const uref = doc(db, "UserInfo", `${uid}`);
      await updateDoc(uref, {
        apply: arrayUnion(`${post.matchId}_${post.id}`)
      });

      console.log(uid, ": 신청 성공", "포스트", post.matchId, post.id);

      alert("신청에 성공했습니다")

    } catch (error) {
      console.error('신청하기 실패:', error.message);
      alert("[Error] 신청에 실패했습니다");
    }

    if (allClose) {
      allClose();
    }
  }, [uid, post, allClose]);

  const onBackClick = useCallback(() => {
    if (close) {
      close();
    }
  }, [close]);

  const onReturnClick = useCallback(() => {
    if (allClose) {
      allClose();
    }
  }, [allClose]);

  return (
    <div className={styles.popUpFrame}>
      <div className={styles.head}>
        <div className={styles.type}>
          오프라인
        </div>
        <img
          className={styles.icon}
          onClick={onReturnClick}
          loading="lazy"
          alt=""
          src="/close-icon.svg"
        />
      </div>

      <div className={styles.titleBox}>
        {post.title}
      </div>

      <div className={styles.card}> <ProfileCard uid={post.writer} /> </div>

      <div className={styles.submitContainer}>
        <div className={styles.Submit} onClick={onBackClick}>
          이전
        </div>

        {uid !== post.writer && post.pnum + 1 > post.acceptedUid.length && (
          <div className={styles.Submit} onClick={onApplyClick}>
            신청
          </div>
        )}
        {uid !== post.writer && post.pnum + 1 <= post.acceptedUid.length && (
          <div className={styles.Submit} style={{cursor: "auto"}}>
            모집 완료
        </div>
        )}
        {uid === post.writer && (
          <div className={styles.Submit} style={{cursor: "auto"}}>
            작성한 게시글입니다
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ReadOffline2;
