import React from "react";
import "../styles/SearchBar.css";  // Correct the path based on your file structure

const SearchBar = ({ city, handleCityChange, handleCitySelect, handleSearch, suggestions }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={city}
                onChange={(e) => handleCityChange(e.target.value)} // Update city on input change
                placeholder="Enter city name"
                className="search-bar-input"
                aria-label="City Name Input"
            />
            <button onClick={handleSearch} className="search-button" aria-label="Search Button">
                Search
            </button>

            {/* Render suggestions dropdown */}
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() =>
                                handleCitySelect(`${suggestion.name}, ${suggestion.region}, ${suggestion.country}`)
                            } // Pass the full city name
                            className="suggestion-item"
                        >
                            {suggestion.name}, {suggestion.region}, {suggestion.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
