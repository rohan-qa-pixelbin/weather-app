import React from "react";
import { useEffect, useRef } from "react";

const Favorites = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
  const favoritesEndRef = useRef(null);
   useEffect(() => {
     if (favoritesEndRef.current) {
       favoritesEndRef.current.scrollIntoView({ behavior: "smooth" });
     }
   }, [favorites]);
  return (
    <div className="favorites">
      <h3 style={{ color: "#ddd" }}>Favorite Locations</h3>
      {favorites.length === 0 ? (
        // Display this message when there are no favorite locations
        <p style={{ color: "#eee", padding: "10px",textAlign:"center",marginTop:0,fontSize:"14.5px" }}>
          No favorite locations added
        </p>
      ) : (
        <ul
          style={{
            maxHeight: "650px", // Set a max height for the scroll area
            overflowY: "auto", // Enables vertical scrollbar if content overflows
            padding: "18px",
            margin: 0,
            listStyle: "none", // Removes default list styling
          }}
        >
          {favorites.map((city, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textalign: "center",
                position: "relative", // Ensures absolute positioning of button is relative to li
                padding: "10px 0",
              }}
            >
              <span onClick={() => onSelectFavorite(city)}>{city}</span>

              <button
                onClick={() => onRemoveFavorite(city)} // Using the passed function
                style={{
                  position: "absolute",
                  right: "20px",
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                title="Remove"
              >
                &mdash;
              </button>
            </li>
          ))}
          <div ref={favoritesEndRef} />
        </ul>
      )}
    </div>
  );
};

export default Favorites;
