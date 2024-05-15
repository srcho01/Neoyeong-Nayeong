import { useState, useCallback } from "react";
import styles from "./ReadOffline1.module.css";
import ReadOffline2 from "./ReadOffline2";
import PortalPopup from "../PortalPopup";

import { useSelector } from "react-redux";
import { selectUserUid } from "../../store/userSlice"


const ReadOffline1 = ({onClose, post}) => {
  const uid = useSelector(selectUserUid); // redux store uid

  const onReturnClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const [isCurrentOpen, setCurrentOpen] = useState(false);
  const open = useCallback(() => {
    setCurrentOpen(true);
  });
  const close = useCallback(() => {
    setCurrentOpen(false);
  });

  const allClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setCurrentOpen(false);
  }, [onClose]);

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
        <div className={styles.input}>
          {post.title}
        </div>
      </div>

      <div className={styles.infoContainer}>
        <b className={styles.infoTitle}>모집인원</b>
        <div className={styles.input}>
          {post.pnum}
        </div>
      </div>

      <div className={styles.articleContainer}>
        <b className={styles.infoTitle}>하고 싶은 말 (선택) </b>
        <pre className={styles.article}> {post.text} </pre>
      </div>
      
      <div className={styles.Submit} onClick={open}>
        작성자 정보
      </div>

      {isCurrentOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0)"
          placement="Centered"
          onOutsideClick={onReturnClick}
        >
          <ReadOffline2 close={close} allClose={allClose} post={post}/>
        </PortalPopup>
      )}

    </div>
  );
};

export default ReadOffline1;