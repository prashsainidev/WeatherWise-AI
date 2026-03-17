import React, { useState } from 'react';
import { fetchCityCoordinates, fetchClimateForecast, searchCities, formatCityLabel } from '../lib/weatherApi';
import '../styles/ClimateChange.css';

const ClimateChange = () => {
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');
    const [climateData, setClimateData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const handleCityChange = async (event) => {
        const value = event.target.value;
        setCity(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const results = await searchCities(value);
            setSuggestions(results);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleCitySelect = (suggestion) => {
        const cityLabel = formatCityLabel(suggestion);
        setCity(cityLabel);
        setSuggestions([]);
    };

    const handleSearch = async () => {
        if (!city.trim()) {
            setError('Please enter a city name.');
            return;
        }

        try {
            setError(null);
            setClimateData(null);
            setLoading(true);
            setSearchedCity(city.trim());
            setSuggestions([]);

            const { lat, lng } = await fetchCityCoordinates(city);
            const climateResponse = await fetchClimateForecast({ latitude: lat, longitude: lng });
            setClimateData(climateResponse);
        } catch (err) {
            setError(err.message || 'Failed to fetch climate data.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="climate-change-container">
            <section className="climate-intro-card">
                <span className="climate-kicker">Hourly outlook</span>
                <h2>Review climate trends</h2>
                <p className="climate-subtitle">
                    Review short-term temperature, wind, pressure, and visibility data for your selected city.
                </p>
            </section>

            <div className="climate-search-card">
                <div className="climate-search-wrapper">
                    <div className="climate-controls">
                        <input
                            type="text"
                            value={city}
                            onChange={handleCityChange}
                            onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                            placeholder="Enter city name"
                            className="climate-input"
                        />
                        <button onClick={handleSearch} className="climate-search-button">
                            Search
                        </button>
                    </div>

                    {suggestions.length > 0 && (
                        <ul className="climate-suggestions-list">
                            {suggestions.map((suggestion) => {
                                const cityLabel = formatCityLabel(suggestion);
                                return (
                                    <li
                                        key={cityLabel}
                                        onMouseDown={() => handleCitySelect(suggestion)}
                                        className="climate-suggestion-item"
                                    >
                                        {cityLabel}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>

            {loading && (
                <div className="climate-status-card">
                    <div className="climate-loader"></div>
                    <span>Loading climate data...</span>
                </div>
            )}

            {error && (
                <div className="climate-status-card climate-status-error">
                    <span>{error}</span>
                </div>
            )}

            {climateData && climateData.hourly && (
                <section className="climate-results-section">
                    <div className="climate-results-header">
                        <span className="climate-kicker">Results</span>
                        <h3>Climate details for {searchedCity}</h3>
                    </div>

                    <div className="climate-table-scroll">
                        <table className="climate-table">
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Temp (°C)</th>
                                    <th>Precip. (mm)</th>
                                    <th>Wind (km/h)</th>
                                    <th>Pressure (hPa)</th>
                                    <th>UV Index</th>
                                    <th>Visibility (km)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {climateData.hourly.temperature_2m.slice(0, 5).map((temp, index) => (
                                    <tr key={climateData.hourly.time[index]}>
                                        <td>{formatDate(climateData.hourly.time[index])}</td>
                                        <td>{temp}</td>
                                        <td>{climateData.hourly.precipitation[index]}</td>
                                        <td>{climateData.hourly.wind_speed_10m[index]}</td>
                                        <td>{climateData.hourly.pressure_msl[index]}</td>
                                        <td>{climateData.hourly.uv_index[index]}</td>
                                        <td>{(climateData.hourly.visibility[index] / 1000).toFixed(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {!climateData && !loading && !error && searchedCity && (
                <div className="climate-placeholder-card">
                    <p>No climate data available</p>
                </div>
            )}
        </div>
    );
};

export default ClimateChange;
