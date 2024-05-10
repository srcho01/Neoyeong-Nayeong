import React from 'react';
import styles from './Logo.module.css';

function Logo() {
  return (
    <h1 className={styles.h}>
      <span className={styles.neona}>너</span>
      <span className={styles.yeong}>영</span>
      <span className={styles.neona}>나</span>
      <span className={styles.yeong}>영</span>
    </h1>
  );
}

export default Logo;
