import React, { useState } from "react";
import "../styles/GlobalComparison.css"; // Import the CSS file
import RecentSearches from "../components/RecentSearches"; // Import the RecentSearches component

const GlobalComparison = () => {
    const [cities, setCities] = useState([""]);
    const [suggestions, setSuggestions] = useState([]);
    const [activeInput, setActiveInput] = useState(null);
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentCities, setRecentCities] = useState([]);  // Added recentCities state
    const [tempCities, setTempCities] = useState([]);  // Temporary state to track selected cities

    const apiKey = import.meta.env.VITE_API_KEY;

    const handleCityChange = async (index, value) => {
        const updatedCities = [...cities];
        updatedCities[index] = value;
        setCities(updatedCities);

        if (value.trim()) {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value.trim()}`
                );
                const data = await response.json();
                setSuggestions(data);
                setActiveInput(index);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleCitySelect = (index, suggestion) => {
        const cityName = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;
        const updatedCities = [...cities];
        updatedCities[index] = cityName;
        setCities(updatedCities);

        setSuggestions([]);
        setActiveInput(null);

        // Track selected city in temporary cities list
        setTempCities((prev) => {
            const newTempCities = [...prev];
            if (!newTempCities.includes(cityName)) {
                newTempCities.push(cityName);
            }
            return newTempCities;
        });
    };

    const handleAddCity = () => {
        if (cities.length < 10) {
            setCities([...cities, ""]);
        } else {
            alert("You can only compare up to 10 cities at a time.");
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
            alert("You must have exactly two cities to swap.");
        }
    };

    const handleResetCities = () => {
        setCities([""]);
        setWeatherData([]);
    };

    const handleCompare = async () => {
        setLoading(true);
        setWeatherData([]);

        try {
            const results = await Promise.all(
                cities.map(async (city) => {
                    if (!city.trim()) {
                        return { city, error: "City name cannot be empty." };
                    }
                    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.error) {
                        return { city, error: data.error.message };
                    }
                    return { city, data };
                })
            );
            setWeatherData(results);

            // After comparison, add selected cities to recentCities
            setRecentCities((prev) => {
                const newRecentCities = [...prev, ...tempCities];
                // Ensure unique cities in the recent searches
                const uniqueCities = [...new Set(newRecentCities)];
                return uniqueCities.slice(0, 10); // Limit to 5 cities
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Define deleteRecentCity function
    const deleteRecentCity = (city) => {
        setRecentCities(recentCities.filter((item) => item !== city));
    };

    return (
        <div className="global-comparison-container">
            {/* Input fields for cities */}
            {cities.map((city, index) => (
                <div key={index} className="city-input-container">
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
                    >
                        Remove
                    </button>

                    {/* Suggestions dropdown */}
                    {activeInput === index && suggestions.length > 0 && (
                        <ul className="suggestions-dropdown">
                            {suggestions.map((suggestion, i) => (
                                <li
                                    key={i}
                                    onMouseDown={() => handleCitySelect(index, suggestion)}
                                    className="suggestion-item"
                                >
                                    {suggestion.name}, {suggestion.region}, {suggestion.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            <div className="button-container">
                <button onClick={handleAddCity} className="add-city-btn">
                    +
                </button>

                <div className="button-group">
                    <button
                        onClick={handleSwapCities}
                        className="swap-cities-btn"
                        disabled={cities.length !== 2}
                    >
                        Swap Cities
                    </button>
                    <button onClick={handleResetCities} className="reset-cities-btn">
                        Reset Cities
                    </button>
                    <button
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

            {loading && <p className="loading-text">Loading weather data...</p>}

            {/* Weather data display */}
            {weatherData.length > 0 && (
                <table className="weather-table">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature (°C)</th>
                            <th>Weather</th>
                            <th>Humidity (%)</th>
                            <th>Feels Like (°C)</th>
                            <th>Gasses (μg/m3)</th>
                            <th>Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.city || "N/A"}</td>
                                <td>{item.data?.current?.temp_c || "N/A"}</td>
                                <td>{item.data?.current?.condition?.text || "N/A"}</td>
                                <td>{item.data?.current?.humidity || "N/A"}</td>
                                <td>{item.data?.current?.feelslike_c || "N/A"}</td>
                                <td>
                                    {item.data?.current?.air_quality ? (
                                        Object.entries(item.data.current.air_quality)
                                            .filter(([key]) => ["co", "no2", "o3"].includes(key))
                                            .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
                                            .join(", ")
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td>
                                    {item.error || "No data error available for this city."}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Recent Searches Component */}
            <RecentSearches recentCities={recentCities} deleteRecentCity={deleteRecentCity} />
        </div>
    );
};

export default GlobalComparison;
