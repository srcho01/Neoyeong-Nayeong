import React from 'react';
import styles from './MainBody.module.css';

const Schedule = ({team1, team2, month, day, hour, minute, loc}) => {
  return (
    <div className={styles.sche}>
      <div className={styles.scheText}>
        {team1} vs {team2}
      </div>

      <div className={styles.date}>
        <div className={styles.scheText}>
          {month}월 {day}일
        </div>
        <div className={styles.scheText}>
          {hour}:{minute}
        </div>
      </div>

      <div className={styles.scheText}>
        {loc}
      </div>
    </div>
  );
};

const schedules = [];
for (let i = 0; i < 30; i++) {
  schedules.push(
    <Schedule 
        team1="키움"
        team2="LG인데 만약에 팀명이 진짜 겁나 길면?"
        month={4}
        day={18}
        hour={14}
        minute={0}
        loc="사직구장인데 어쩌고 저쩌고 만약에 안사직구장?"
    />
  );
}

const Component = ({imageSrc}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} className={styles.image}/>
      </div>
      <div className={styles.scheContainer}>
        {schedules}
      </div>
    </div>
  );
};

function MainBody() {
  return (
    <div className={styles.frame}>
      <Component
        imageSrc = "/kbo.png"
      />
      <Component
        imageSrc = "/kleague.png"
      />
      <Component
        imageSrc = "/lck.png"
      />
    </div>
  );
}

export default MainBody;
