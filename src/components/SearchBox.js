import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

     const handleKeyDown = (event) => {
       if (event.key === "Enter") {
         handleSearch();
       }
     };
    
  return (
    <div className="search-box">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter Location"
        onKeyDown={handleKeyDown}
        style={{
          fontFamily: "Poppins', sans-serif",
          width: "360px",
          padding: "15px",
          borderRadius: "10px",
          borderColor: "#b0b0b0",
        }}
      />
    </div>
  );
};

export default SearchBox;
