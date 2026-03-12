import React from 'react';
import { formatCityLabel } from '../lib/weatherApi';
import '../styles/SearchBar.css';

const SearchBar = ({ city, handleCityChange, handleCitySelect, handleSearch, suggestions }) => {
    return (
        <div className="search-bar-container">
            <div className="search-bar-copy">
                <span className="search-bar-label">Search city</span>
                <h2>Search weather by city.</h2>
                <p className="search-bar-subtitle">
                    Enter a city to check live conditions, local time, and air quality.
                </p>
            </div>

            <div className="search-bar-interactive">
                <div className="search-bar-controls">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="Enter city name"
                        className="search-bar-input"
                        aria-label="City Name Input"
                    />
                    <button onClick={handleSearch} className="search-button" aria-label="Search Button">
                        Check now
                    </button>
                </div>

                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => {
                            const cityLabel = formatCityLabel(suggestion);

                            return (
                                <li
                                    key={cityLabel}
                                    onClick={() => handleCitySelect(cityLabel)}
                                    className="suggestion-item"
                                >
                                    {cityLabel}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className="search-bar-pill-row">
                <span>Current weather</span>
                <span>Air quality</span>
                <span>Local time</span>
            </div>
        </div>
    );
};

export default SearchBar;
