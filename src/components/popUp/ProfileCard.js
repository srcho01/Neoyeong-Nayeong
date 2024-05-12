import styles from "./ProfileCard.module.css";

const ProfileCard = () => {
  return (
    <div className={styles.popUpFrame}>
      <div className={styles.profileContainer}>
        <img
            className={styles.profileImage}
            loading="lazy"
            alt=""
            src="/default-profile.png"
        />
        <b className={styles.name}> 홍길동 </b>
        <div className={styles.info}>
          <div className={styles.infoContainer}>
            <div className={styles.li}> 성별 </div>
            <div className={styles.li}> 남자 </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.li}> 연령대 </div>
            <div className={styles.li}> 20대 </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.li}> 관심 스포츠 </div>
            <div className={styles.li}> 야구, 축구, LoL </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.li}> 관심 스포팀 </div>
            <div className={styles.team}>
              <div className={styles.li}> 야구 - LG Twins </div>
              <div className={styles.li}> LoL - SKT T1 </div>
              <div className={styles.li}> LoL - 젠지 </div>
              <div className={styles.li}> LoL - SKT T1 </div>
              <div className={styles.li}> LoL - SKT T1 </div>
              <div className={styles.li}> LoL - SKT T1 </div>
              <div className={styles.li}> LoL - SKT T1 </div>
              <div className={styles.li}> LoL - SKT T1 </div>
              <div className={styles.li}> LoL - SKT T1 </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;