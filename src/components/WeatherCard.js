import React from "react";

const WeatherCard = ({ weatherData, onAddFavorite }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-card">
      <h2>
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      <p>
        <h2> {weatherData.main.temp}° C</h2>
      </p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <button
        className="favorite-button-outline"
        onClick={() => onAddFavorite(weatherData.name)}
        
      >
        Add as Favorites
      </button>
    </div>
  );
};

export default WeatherCard;
