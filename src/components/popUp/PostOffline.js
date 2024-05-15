import { useCallback, useState } from "react";
import styles from "./PostOffline.module.css";

import getUserInput from "../../hooks/getUserInput"
import { db } from '../../firebase';
import { collection, doc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/userSlice"

const PostOffline = ({onClose, match}) => {
  // useStates
  const [title, setTitle, changeTitle] = getUserInput("");
  const [pnum, setNum] = useState(1);
  const [text, setText, changeText] = getUserInput("");

  const changeNum = useCallback((e) => {
    setNum(parseInt(e.target.value));
  }, []);

  // Get user info
  const uid = useSelector(selectUserUid); // redux store uid

  const onReturnClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const onSubmitClick = useCallback(async () => {
    if (title === "") {
      alert("제목을 입력해주세요");
      return;
    }
    
    const post = {
      "writer": uid,
      "matchId": match,
      "type": "오프라인",
      "title": title,
      "pnum": pnum,
      "text": text,
      "applyUid": [],
      "acceptedUid": [uid]
    }

    try {
      const ref = collection(db, "Board", `${match}`, "Posts");
      const response = await addDoc(ref, post);

      // write user info
      const uref = doc(db, "UserInfo", `${uid}`);
      await updateDoc(uref, {
        write: arrayUnion(`${match}_${response.id}`)
      });

      console.log('오프라인 글 등록 성공');

    } catch (error) {
      console.error('오프라인 글 등록 실패:', error.message);
      alert("글 등록에 실패했습니다!");
    }

    if (onClose) {
      window.location.reload();
      onClose();
    }

  }, [onClose, uid, title, pnum, text, match]);


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

      <div className={styles.infoContainer}>
        <b className={styles.infoTitle}>제목</b>
        <input
          className={styles.input}
          type="text"
          onChange={changeTitle}
        />
      </div>

      <div className={styles.infoContainer}>
        <b className={styles.infoTitle}>모집인원</b>
        <div className={styles.people}>
          <p> 1 </p>
          <input
            className={styles.input}
            type="range"
            min="1"
            max="20"
            value={pnum}
            onChange={changeNum}
          />
          <p> 20 </p>
          <p style={{marginLeft: '30px'}}> 모집인원 : {pnum}</p>
        </div>
      </div>

      <div className={styles.articleContainer}>
        <b className={styles.infoTitle}>하고 싶은 말 (선택) </b>
        <textarea
          className={styles.article}
          type="text"
          onChange={changeText}
        />
      </div>
      
      <div className={styles.Submit} onClick={onSubmitClick}>
        등록하기
      </div>

    </div>
  );
};

export default PostOffline;