import React, { useEffect, useState } from 'react';
import { fetchCityCoordinates, fetchClimateForecast } from '../lib/weatherApi';
import '../styles/ClimateChange.css';

const ClimateChange = () => {
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [climateData, setClimateData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadClimateData = async () => {
            if (latitude == null || longitude == null) {
                return;
            }

            try {
                setLoading(true);
                const data = await fetchClimateForecast({ latitude, longitude });
                setClimateData(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch climate data.');
            } finally {
                setLoading(false);
            }
        };

        loadClimateData();
    }, [latitude, longitude]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = async () => {
        try {
            setError(null);
            setClimateData(null);
            setSearchedCity(city.trim());

            const { lat, lng } = await fetchCityCoordinates(city);
            setLatitude(lat);
            setLongitude(lng);
        } catch (err) {
            setError(err.message || 'Failed to fetch coordinates.');
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
                <h2>Review upcoming temperature, wind, pressure, and visibility in one table.</h2>
            </section>

            <div className="climate-search-container">
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                    placeholder="Enter city name"
                    className="climate-input"
                />
                <button onClick={handleSearch} className="climate-button">
                    Search
                </button>
            </div>

            {loading && (
                <div className="climate-status">
                    <div className="loader"></div>
                    <span>Loading climate data...</span>
                </div>
            )}
            {error && (
                <div className="climate-status climate-status-error">
                    <span>{error}</span>
                </div>
            )}

            <div className="climate-results-container">
                <h3 className="climate-subheading">
                    Weather details for {searchedCity ? searchedCity : 'your selected city'}
                </h3>
                {climateData && climateData.hourly ? (
                    <div className="climate-table-shell">
                        <table className="climate-table">
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Temp (degC)</th>
                                    <th>Precip. (mm)</th>
                                    <th>Wind (km/h)</th>
                                    <th>Pressure (hPa)</th>
                                    <th>UV</th>
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
