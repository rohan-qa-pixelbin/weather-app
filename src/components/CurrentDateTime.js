// src/components/CurrentDateTime.js

import React, { useState, useEffect } from "react";

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${ampm}`;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = now.toLocaleDateString(undefined, options);

    setCurrentTime(`${formattedTime} - ${formattedDate}`);
  };

  useEffect(() => {
    updateTime(); 
    const timer = setInterval(updateTime, 1000); 

    return () => clearInterval(timer); 
  }, []);

  return <div className="current-date-time">{currentTime}</div>;
};

export default CurrentDateTime;
