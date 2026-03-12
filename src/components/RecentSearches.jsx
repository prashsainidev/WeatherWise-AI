import React from 'react';
import '../styles/RecentSearches.css';

const RecentSearches = ({ recentCities, deleteRecentCity }) => {
    if (!recentCities.length) {
        return (
            <section className="recent-searches-container recent-searches-empty">
                <span className="recent-searches-kicker">Recent searches</span>
                <p className="no-recent-searches">No recent searches yet. Your latest lookups will appear here.</p>
            </section>
        );
    }

    return (
        <section className="recent-searches-container">
            <div className="recent-searches-header">
                <div>
                    <span className="recent-searches-kicker">Recent searches</span>
                    <h3 className="recent-searches-title">Places you checked lately</h3>
                </div>
                <span className="recent-searches-count">{recentCities.length}</span>
            </div>
            <ul className="recent-searches-list">
                {recentCities.map((city) => (
                    <li key={city} className="recent-search-item">
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
        </section>
    );
};

export default RecentSearches;
