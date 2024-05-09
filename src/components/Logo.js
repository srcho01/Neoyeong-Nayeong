import React from 'react';
import styles from './Logo.module.css'; // 로고의 스타일이 포함된 CSS 파일을 import합니다.

function Logo() {
  return (
    <h1 className={styles.h}>
      {/* <span>{` `}</span> */}
      <span className={styles.logo}>너</span>
      <span>영</span>
      <span className={styles.logo}>나</span>
      <span>영</span>
    </h1>
  );
}

export default Logo;
