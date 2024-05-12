import React, { useState } from 'react';
import { useCallback } from "react";
import styles from "./PostSelectType.module.css";

import PortalPopup from "../PortalPopup";
import PostOffline from "./PostOffline"
import PostOnline from "./PostOnline"
import Logo from '../Logo';

const PostSelectType = ({onClose}) => {
  const [isPostOfflineOpen, setPostOfflineOpen] = useState(false);
  const [isPostOnlineOpen, setPostOnlineOpen] = useState(false);

  const openPostOffline = () => {
    setPostOfflineOpen(true);
  };
  const openPostOnline = () => {
    setPostOnlineOpen(true);
  };

  const closePostOffline = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setPostOfflineOpen(false);
  }, [onClose]);
  const closePostOnline = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setPostOnlineOpen(false);
  }, [onClose]);

  return (
    <div className={styles.popUpFrame}>
        <Logo/>
        <div className={styles.text}>
          함께 할 유형을 선택해주세요
        </div>
        <div className={styles.typeContainer}>
          <b className={styles.type} onClick={openPostOffline}>오프라인</b>
          <b className={styles.type} onClick={openPostOnline}>온라인</b>
        </div>

      {isPostOfflineOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePostOffline}
        >
          <PostOffline onClose={closePostOffline} />
        </PortalPopup>
      )}

      {isPostOnlineOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePostOnline}
        >
          <PostOnline onClose={closePostOnline} />
        </PortalPopup>
      )}

    </div>
  );
};

export default PostSelectType;
