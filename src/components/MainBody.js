import React from 'react';
import { useState, useEffect } from "react";
import styles from './MainBody.module.css';

import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

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
          {hour}:{minute < 9 ? `0${minute}` : minute}
        </div>
      </div>

      <div className={styles.scheText}>
        {loc}
      </div>
    </div>
  );
};

async function getSchedules(sport) {
  const schedules = [];

  try {
    const colloecitonRef = collection(db, `Sche${sport}`);
    const queryResult = await getDocs(colloecitonRef);

    const today = new Date();
    let count = 0;

    queryResult.forEach((doc) => {
      if (count >= 10) return; // 최대 10개
      const data = doc.data();
      const { month, day } = data;

      // 데이터의 날짜를 Date 객체로 변환
      const gameDate = new Date(today.getFullYear(), month - 1, day);

      // 오늘 이후의 데이터인 경우 스케줄에 추가
      if (gameDate >= today || (gameDate.getDate() === today.getDate() && gameDate.getMonth() === today.getMonth())) {
        schedules.push(data);
        count++;
      }
    });

  } catch (error) {
    console.error("Error fetching user info:", error);
  }

  return schedules;
}

const Component = ({imageSrc, sport}) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function fetchSchedules() {
      const fetchData = await getSchedules(sport);
      setSchedules(fetchData);
    }

    fetchSchedules();

    console.log(schedules);
  }, [sport]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} className={styles.image}/>
      </div>
      <div className={styles.scheContainer}>
        {schedules.map((schedule, index) => (
          <Schedule 
            team1={schedule.team1}
            team2={schedule.team2}
            month={schedule.month}
            day={schedule.day}
            hour={schedule.hour}
            minute={schedule.minute}
            loc={schedule.loc}
          />
        ))}
      </div>
    </div>
  );
};

function MainBody() {
  return (
    <div className={styles.frame}>
      <Component
        imageSrc = "/kbo.png"
        sport = "Baseball"
      />
      <Component
        imageSrc = "/kleague.png"
        sport = "Soccer"
      />
      <Component
        imageSrc = "/lck.png"
        sport = "LoL"
      />
    </div>
  );
}

export default MainBody;
