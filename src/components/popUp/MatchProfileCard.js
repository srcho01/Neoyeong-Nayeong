import { useCallback } from "react";
import styles from "./MatchProfileCard.module.css";
import ProfileCard from "./ProfileCard";

import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";


const MatchProfileCard = ({close, allClose, uid, post, isAccepted}) => {
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

  const onAcceptClick = useCallback(async() => {
    const ref = doc(db, "Board", `${post.matchId}`, "Posts", `${post.id}`);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.acceptedUid.length === data.pnum) {
        alert("모집이 완료되었습니다");
        if (allClose) {
          allClose();
        }
        return;
      }
    }

    // 게시글의 acceptedUid에 추가
    try {
      // write post
      await updateDoc(ref, {
        acceptedUid: arrayUnion(uid)
      });

      alert("수락했습니다");
      window.location.reload();

    } catch (error) {
      console.error('추가 실패:', error.message);
      alert("[Error] 신청에 실패했습니다");
    }
  }, [close, allClose]);


  return (
    <div className={styles.popUpFrame}>
      <div className={styles.head}>
        <div className={styles.title}>
          프로필
        </div>
        <img
          className={styles.icon}
          onClick={onReturnClick}
          loading="lazy"
          alt=""
          src="/close-icon.svg"
        />
      </div>

      <div className={styles.card}> <ProfileCard uid={uid} /> </div>

      <div className={styles.submitContainer}>
        <span className={styles.submit} onClick={onBackClick}>
          이전
        </span>
        {!isAccepted && (
          <span className={styles.submit} onClick={onAcceptClick}>
            수락
          </span>
        )}
      </div>
    </div>
  );
};

export default MatchProfileCard;
