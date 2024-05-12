import { useState, useCallback } from "react";
import styles from "./ReadOffline1.module.css";
import ReadOffline2 from "./ReadOffline2";
import PortalPopup from "../PortalPopup";

const ReadOffline1 = ({onClose}) => {
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
          제목제목 오프라인 제목 ㅁㄴㄻㄴㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㅇㄻㄴㅇㄻㄴㅇ
        </div>
      </div>

      <div className={styles.infoContainer}>
        <b className={styles.infoTitle}>모집인원</b>
        <div className={styles.input}>
          1
        </div>
      </div>

      <div className={styles.articleContainer}>
        <b className={styles.infoTitle}>하고 싶은 말 (선택) </b>
        <pre className={styles.article}>
{`줄바꿈 해줘
줄바꿈 해줘
줄바꿈 해줘
줄바꿈 해줘
줄바꿈 해줘
줄바꿈 해줘
이게 뭐냐
이거 맞냐
진짜 뭐 이런 게 다 있냐
개오바라고 생각한다
sa
f
asd
f
a
`}
        </pre>
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
          <ReadOffline2 close={close} allClose={allClose}/>
        </PortalPopup>
      )}

    </div>
  );
};

export default ReadOffline1;