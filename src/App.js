import React, { useState,useEffect } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import Favorites from "./components/Favorites";



const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState(()=>
{
   const savedFavorites = localStorage.getItem("favorites");
   return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
  );
  
    const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
    const MAX_FAVORITES = 20;


    useEffect(() => {
      getCurrentLocationWeather();
    }, []);

    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    

    useEffect(() => {
      const updateCurrentTimeAndDate = () => {
        const now = new Date();

        // Time Formatting
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0"); // Adds leading zero
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Converts 24-hour format to 12-hour format
        const timeString = `${formattedHours}:${minutes} ${ampm}`;
        setCurrentTime(timeString);

        // Date Formatting
        const options = { weekday: "long", day: "numeric", month: "short" };
        const dateString = now.toLocaleDateString("en-US", options); // "Friday, 30 Aug"
        setCurrentDate(dateString);
      };

      updateCurrentTimeAndDate(); // Set initial time and date

      const intervalId = setInterval(updateCurrentTimeAndDate, 1000); // Update time every second

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

  const apiKey = "5ba1ba361346bd0040e36995c3799606";

  const fetchWeatherData = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          alert("Location not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

     const getCurrentLocationWeather = () => {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
           (position) => {
             const { latitude, longitude } = position.coords;
             fetchWeatherByCoordinates(latitude, longitude);
           },
           (error) => {
             console.error("Error getting location:", error);
             alert(
               "Unable to retrieve your location. Please enter it manually."
             );
           }
         );
       } else {
         alert("Geolocation is not supported by your browser.");
       }
     };
    
     const fetchWeatherByCoordinates = (lat, lon) => {
       const apiKey = "5ba1ba361346bd0040e36995c3799606";
       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

       fetch(url)
         .then((response) => response.json())
         .then((data) => {
           if (data.cod === 200) {
             setCurrentLocationWeather(data);
           } else {
             alert("Unable to fetch weather for your current location.");
           }
         })
         .catch((error) =>
           console.error("Error fetching weather data:", error)
         );
     };
    
    const addFavorite = (city) => {
      
if (favorites.length >= MAX_FAVORITES) {
  alert("You can only add a maximum of 20 locations to favorites.");
  return;
}

    if (!favorites.includes(city)) {
      // setFavorites([...favorites, city]);
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 

    }
  };

  const selectFavorite = (city) => {
    fetchWeatherData(city);

    
  };

      const handleRemoveFavorite = (city) => {
        // setFavorites(favorites.filter((favorite) => favorite !== city));

        const updatedFavorites = favorites.filter((fav) => fav !== city);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      };
  
   
    
  return (
    <div className="container">
      <div className="current-time">
        <p>{currentTime}</p>
      </div>
      <div className="current-date">
        <p>{currentDate}</p>
      </div>
      {currentLocationWeather && (
        <>
          {/* Separate div for the location name */}
          <div className="current-location">
            <h3>{currentLocationWeather.name}</h3>
          </div>
          <div className="place-container">
            {currentLocationWeather.sys.country}
          </div>
          <div className="current-location-weather">
            {/* <p><b>{currentLocationWeather.name}</b></p> */}
            <p>Temprature: {currentLocationWeather.main.temp}°C</p>
            <p>Humidity: {currentLocationWeather.main.humidity}%</p>
            <p>Wind Speed: {currentLocationWeather.wind.speed} m/s</p>
          </div>
        </>
      )}
      <h1>Weather Dashboard</h1>
      <SearchBox onSearch={fetchWeatherData} />
      <WeatherCard weatherData={weatherData} onAddFavorite={addFavorite} />

      <Favorites
        favorites={favorites}
        onSelectFavorite={selectFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
};



export default App;
