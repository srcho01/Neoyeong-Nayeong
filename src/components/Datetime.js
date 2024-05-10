import { useState, useEffect } from "react";

const Datetime = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const year = now.getFullYear();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      const dateString = `${year}년 ${month}월 ${day}일`;
      const timeString = `${hours}시 ${minutes}분`;

      setCurrentDateTime(`${dateString} ${timeString}`);
    };

    // 최초 렌더링 시 현재 날짜와 시간을 설정하고, 1분마다 업데이트
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return currentDateTime;
};

export default Datetime;