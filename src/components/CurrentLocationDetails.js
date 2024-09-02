import React from "react";

const CurrentLocationDetails = ({ location, temperature }) => {
  return (
    <div className="current-location-details">
      <h2>{location}</h2>
      <p>Temperature: {temperature}°C</p>
    </div>
  );
};

export default CurrentLocationDetails;
