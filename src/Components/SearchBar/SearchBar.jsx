import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import "./SearchBar.css"; // Assuming you will place your styles here

const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="search-bar">
      <HiLocationMarker className="search-icon" size={30} />
      <input
        className="search-input"
        placeholder="Search by title/city/country..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="search-button" style={{ borderRadius: "60px" }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
