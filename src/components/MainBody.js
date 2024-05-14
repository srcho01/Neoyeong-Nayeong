import React from 'react';
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from './MainBody.module.css';

import baseball from "../data/kbo"
import soccer from "../data/kleague"
import lol from "../data/lck"


const Schedule = ({sport, id, team1, team2, month, day, hour, minute, loc}) => {
  const navigate = useNavigate();
  
  const query = `sport=${sport.toLowerCase()}\
&id=${id}\
&team1=${team1}\
&team2=${team2}\
&month=${month}\
&day=${day}\
&hour=${hour}\
&minute=${minute}\
&loc=${loc}`;

  const handleClick = useCallback(() => {
    navigate(`/match/board/value?${query}`);
  }, [navigate]);

  return (
    <div className={styles.sche} onClick={handleClick}>
      <div className={styles.scheText}>
        {team1} vs {team2}
      </div>

      <div className={styles.date}>
        <div className={styles.scheText}>
          {month}월 {day}일
        </div>
        <div className={styles.scheText}>
          {hour < 9 ? `0${hour}` : hour}:{minute < 9 ? `0${minute}` : minute}
        </div>
      </div>

      <div className={styles.scheText}>
        {loc}
      </div>
    </div>
  );
};

function getSchedules(sport) {
  const schedules = [];
  let data = null;

  if (sport === "Baseball") {
    data = baseball;
  } else if (sport === "Soccer") {
    data = soccer;
  } else if (sport === "LoL") {
    data = lol;
  }

  try {
    const today = new Date();

    // 객체의 키 값을 배열로 추출
    const keys = Object.keys(data);

    // 키 값을 숫자로 변환하여 정렬
    const sortedKeys = keys.sort((a, b) => parseInt(a) - parseInt(b));

    let cnt = 0;
    sortedKeys.forEach(key => {
      if (cnt >= 10) {
        return;
      }

      const month = data[key].month;
      const day = data[key].day;
      const gameDate = new Date(today.getFullYear(), month - 1, day);
      
      if (gameDate >= today || (gameDate.getDate() === today.getDate() && gameDate.getMonth() === today.getMonth())) {
        schedules.push({
          'id': key,
          ...data[key]
        })
        cnt += 1;
      }
    });

  } catch (error) {
    console.error("Error fetching user info:", error);
  }

  console.log(schedules);
  return schedules;
}

const Component = ({imageSrc, sport}) => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchData = getSchedules(sport);
    setSchedules(fetchData);
  }, [sport]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} className={styles.image}/>
      </div>
      <div className={styles.scheContainer}>
        {schedules.map((schedule, index) => (
          <Schedule 
            sport={sport}
            id={schedule.id}
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
