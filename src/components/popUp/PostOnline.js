import { useCallback } from "react";
import styles from "./PostOnline.module.css";

const PostOnline = ({onClose}) => {
  const onReturnClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
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
        <input
          className={styles.input}
          type="text"
        />
      </div>

      <div className={styles.infoContainer}>
        <b className={styles.infoTitle}>지역</b>
        <input
          className={styles.input}
          type="text"
        />
      </div>

      <div className={styles.infoContainer}>
        <b className={styles.infoTitle}>모집인원</b>
        <input
          className={styles.input}
          type="number"
        />
      </div>

      <div className={styles.articleContainer}>
        <b className={styles.infoTitle}>하고 싶은 말 (선택) </b>
        <textarea
          className={styles.article}
          type="text"
        />
      </div>
      
      <div className={styles.Submit} onClick={onReturnClick}>
        등록하기
      </div>

    </div>
  );
};

export default PostOnline;