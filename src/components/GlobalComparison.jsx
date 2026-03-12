import React, { useState } from 'react';
import RecentSearches from '../components/RecentSearches';
import { fetchCurrentWeather, formatCityLabel, searchCities } from '../lib/weatherApi';
import '../styles/GlobalComparison.css';

const MAX_COMPARE_CITIES = 10;

const GlobalComparison = () => {
    const [cities, setCities] = useState(['']);
    const [suggestions, setSuggestions] = useState([]);
    const [activeInput, setActiveInput] = useState(null);
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentCities, setRecentCities] = useState([]);

    const handleCityChange = async (index, value) => {
        const updatedCities = [...cities];
        updatedCities[index] = value;
        setCities(updatedCities);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const nextSuggestions = await searchCities(value);
            setSuggestions(nextSuggestions);
            setActiveInput(index);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleCitySelect = (index, suggestion) => {
        const cityName = formatCityLabel(suggestion);
        const updatedCities = [...cities];
        updatedCities[index] = cityName;
        setCities(updatedCities);

        setSuggestions([]);
        setActiveInput(null);
    };

    const handleAddCity = () => {
        if (cities.length < MAX_COMPARE_CITIES) {
            setCities([...cities, '']);
        } else {
            alert(`You can only compare up to ${MAX_COMPARE_CITIES} cities at a time.`);
        }
    };

    const handleRemoveCity = (index) => {
        const updatedCities = cities.filter((_, i) => i !== index);
        setCities(updatedCities);
    };

    const handleSwapCities = () => {
        if (cities.length === 2) {
            const swappedCities = [cities[1], cities[0]];
            setCities(swappedCities);
        } else {
            alert('You must have exactly two cities to swap.');
        }
    };

    const handleResetCities = () => {
        setCities(['']);
        setWeatherData([]);
        setSuggestions([]);
        setActiveInput(null);
    };

    const handleCompare = async () => {
        setLoading(true);
        setWeatherData([]);

        try {
            const results = await Promise.all(
                cities.map(async (city) => {
                    if (!city.trim()) {
                        return { city, error: 'City name cannot be empty.' };
                    }

                    try {
                        const data = await fetchCurrentWeather(city);
                        return { city, data };
                    } catch (error) {
                        return { city, error: error.message };
                    }
                })
            );

            setWeatherData(results);
            setRecentCities((prev) => [...new Set([...prev, ...cities.filter(Boolean)])].slice(0, MAX_COMPARE_CITIES));
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteRecentCity = (city) => {
        setRecentCities(recentCities.filter((item) => item !== city));
    };

    return (
        <div className="global-comparison-container">
            <section className="comparison-intro-card">
                <span className="comparison-kicker">Compare cities</span>
                <h2>Add cities to compare current conditions, wind, and air quality.</h2>
            </section>

            {cities.map((city, index) => (
                <div key={index} className="city-input-container">
                    <div className="city-input-shell">
                        <span className="city-index-tag">{String(index + 1).padStart(2, "0")}</span>
                        <input
                            type="text"
                            placeholder={`City ${index + 1}`}
                            value={city}
                            onChange={(e) => handleCityChange(index, e.target.value)}
                            onFocus={() => setActiveInput(index)}
                            onBlur={() => setTimeout(() => setSuggestions([]), 200)}
                            className="city-input"
                        />
                        <button
                            onClick={() => handleRemoveCity(index)}
                            disabled={cities.length === 1}
                            className="city-remove-btn"
                        >
                            Remove
                        </button>

                        {activeInput === index && suggestions.length > 0 && (
                            <ul className="suggestions-dropdown">
                                {suggestions.map((suggestion) => {
                                    const cityLabel = formatCityLabel(suggestion);

                                    return (
                                        <li
                                            key={cityLabel}
                                            onMouseDown={() => handleCitySelect(index, suggestion)}
                                            className="suggestion-item"
                                        >
                                            {cityLabel}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            ))}

            <div className="button-container">
                <button type="button" onClick={handleAddCity} className="add-city-btn">
                    Add city
                </button>

                <div className="button-group">
                    <button
                        type="button"
                        onClick={handleSwapCities}
                        className="swap-cities-btn"
                        disabled={cities.length !== 2}
                    >
                        Swap cities
                    </button>
                    <button type="button" onClick={handleResetCities} className="reset-cities-btn">
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleCompare}
                        className="compare-weather-btn"
                        disabled={
                            cities.length < 2 || cities.some((city) => !city.trim())
                        }
                    >
                        Compare
                    </button>
                </div>
            </div>

            {loading && (
                <div className="comparison-status-card" aria-live="polite">
                    <div className="comparison-loader"></div>
                    <p className="loading-text">Loading weather data...</p>
                </div>
            )}

            {weatherData.length > 0 && (
                <section className="comparison-results-shell">
                    <div className="comparison-results-header">
                        <span className="comparison-kicker">Results</span>
                        <h3>Comparison results</h3>
                    </div>
                    <div className="weather-table-scroll">
                        <table className="weather-table">
                            <thead>
                                <tr>
                                    <th>City</th>
                                    <th>Temperature (degC)</th>
                                    <th>Weather</th>
                                    <th>Humidity (%)</th>
                                    <th>Feels like (degC)</th>
                                    <th>Gases (ug/m3)</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {weatherData.map((item) => (
                                    <tr key={item.city}>
                                        <td>{item.city || 'N/A'}</td>
                                        <td>{item.data?.current?.temp_c || 'N/A'}</td>
                                        <td>{item.data?.current?.condition?.text || 'N/A'}</td>
                                        <td>{item.data?.current?.humidity || 'N/A'}</td>
                                        <td>{item.data?.current?.feelslike_c || 'N/A'}</td>
                                        <td>
                                            {item.data?.current?.air_quality ? (
                                                Object.entries(item.data.current.air_quality)
                                                    .filter(([key]) => ['co', 'no2', 'o3'].includes(key))
                                                    .map(([key, value]) => `${key.toUpperCase()}: ${Math.round(value)}`)
                                                    .join(', ')
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                        <td>{item.error || 'Ready'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            <RecentSearches recentCities={recentCities} deleteRecentCity={deleteRecentCity} />
        </div>
    );
};

export default GlobalComparison;
