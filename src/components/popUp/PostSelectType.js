import React, { useState } from 'react';
import { useCallback } from "react";
import styles from "./PostSelectType.module.css";

import PortalPopup from "../PortalPopup";
import PostOffline from "./PostOffline"
import PostOnline from "./PostOnline"
import Logo from '../Logo';

const PostSelectType = ({onClose, match}) => {
  const [isPostOffline, setPostOffline] = useState(false);
  const [isPostOnline, setPostOnline] = useState(false);

  const openPostOffline = () => {
    setPostOffline(true);
  };
  const openPostOnline = () => {
    setPostOnline(true);
  };

  const closePostOffline = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setPostOffline(false);
  }, [onClose]);
  const closePostOnline = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setPostOnline(false);
  }, [onClose]);

  return (
    <div className={styles.popUpFrame}>
        <Logo isLogout={false}/>
        <div className={styles.text}>
          함께 할 유형을 선택해주세요
        </div>
        <div className={styles.typeContainer}>
          <b className={styles.type} onClick={openPostOffline}>오프라인</b>
          <b className={styles.type} onClick={openPostOnline}>온라인</b>
        </div>

      {isPostOffline && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePostOffline}
        >
          <PostOffline onClose={closePostOffline} match={match}/>
        </PortalPopup>
      )}

      {isPostOnline && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePostOnline}
        >
          <PostOnline onClose={closePostOnline} match={match}/>
        </PortalPopup>
      )}

    </div>
  );
};

export default PostSelectType;
