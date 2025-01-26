import React, { useState, useEffect } from 'react';
import "../styles/ClimateChange.css";  // Import your CSS file

const ClimateChange = () => {
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [climateData, setClimateData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCoordinates = async (city) => {
        try {
            const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${city}`
            );
            const data = await response.json();
            console.log(data); // Check geocoding results
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry;
                setLatitude(lat);
                setLongitude(lng);
                setError(null);
            } else {
                setError('City not found!');
            }
        } catch (err) {
            setError('Failed to fetch coordinates');
        }
    };

    const fetchClimateData = async () => {
        if (latitude && longitude) {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,wind_speed_10m,pressure_msl,uv_index,visibility`
                );
                const data = await response.json();
                console.log(data); // Check response structure
                setClimateData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch climate data');
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (latitude && longitude) {
            fetchClimateData();
        }
    }, [latitude, longitude]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = () => {
        setSearchedCity(city);  // Set searchedCity when Search is clicked
        fetchCoordinates(city);
    };

    const formatDate = (hourIndex) => {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + hourIndex);
        return currentDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="climate-change-container">
            {/* Search Bar */}
            <div className="climate-search-container">
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Enter city name"
                    className="climate-input"
                />
                <button onClick={handleSearch} className="climate-button">
                    Search
                </button>
            </div>

            {/* Status Messages */}
            {loading && (
                <div className="climate-status">
                    <div className="loader"></div>
                    <span>Loading climate data...</span>
                </div>
            )}
            {error && (
                <div className="climate-status">
                    <span>{error}</span>
                </div>
            )}

            {/* Climate Results / Placeholder */}
            <div className="climate-results-container">
                <h3 className="climate-subheading">
                    Temperature Trends in {searchedCity ? searchedCity : "your selected city"}
                </h3>
                {climateData && climateData.hourly ? (
                    <table className="climate-table">
                        <thead>
                            <tr>
                                <th>Date & Time</th>
                                <th>Temp (°C)</th>
                                <th>Precip. (mm)</th>
                                <th>Wind (m/s)</th>
                                <th>Pressure (hPa)</th>
                                <th>UV</th>
                                <th>Visibility (km)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {climateData.hourly.temperature_2m.slice(0, 5).map((temp, index) => (
                                <tr key={index}>
                                    <td>{formatDate(index)}</td>
                                    <td>{temp}</td>
                                    <td>{climateData.hourly.precipitation[index]}</td>
                                    <td>{climateData.hourly.wind_speed_10m[index]}</td>
                                    <td>{climateData.hourly.pressure_msl[index]}</td>
                                    <td>{climateData.hourly.uv_index[index]}</td>
                                    <td>{climateData.hourly.visibility[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="climate-placeholder">
                        <p>No climate data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClimateChange;
