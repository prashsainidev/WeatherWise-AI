import React from "react";
import "../styles/RecentSearches.css";  // Ensure you import the CSS file

const RecentSearches = ({ recentCities, deleteRecentCity }) => {
    if (!recentCities.length) return <p className="no-recent-searches">No recent searches yet.</p>;

    return (
        <div className="recent-searches-container">
            <h3 className="recent-searches-title">Recent Searches</h3>
            <ul className="recent-searches-list">
                {recentCities.map((city, index) => (
                    <li key={index} className="recent-search-item">
                        <span className="city-name">{city}</span>
                        <button
                            onClick={() => deleteRecentCity(city)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentSearches;
