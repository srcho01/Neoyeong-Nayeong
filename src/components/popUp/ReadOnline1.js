import { useState, useCallback } from "react";
import styles from "./ReadOnline1.module.css";
import ReadOnline2 from "./ReadOnline2";
import PortalPopup from "../PortalPopup";

const ReadOnline1 = ({onClose, post}) => {
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
          온라인
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
        <b className={styles.infoTitle}> 지역 </b>
        <div className={styles.input}>
          지역
        </div>
      </div>

      <div className={styles.infoContainer}>
        <b className={styles.infoTitle}>모집인원</b>
        <div className={styles.input}>
          {post.pnum-1}
        </div>
      </div>

      <div className={styles.articleContainer}>
        <b className={styles.infoTitle}>하고 싶은 말 (선택) </b>
        <pre className={styles.article}> {post.text} </pre>
      </div>
      
      <div className={styles.Submit} onClick={open}>
        다음
      </div>

      {isCurrentOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0)"
          placement="Centered"
          onOutsideClick={onReturnClick}
        >
          <ReadOnline2 close={close} allClose={allClose} post={post}/>
        </PortalPopup>
      )}

    </div>
  );
};

export default ReadOnline1;