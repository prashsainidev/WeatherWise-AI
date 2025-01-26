import React from "react";
import "../styles/WeatherDisplay.css"; // Import your styles

const WeatherDisplay = ({ weather, loading }) => {
    if (loading) {
        return (
            <div className="weather-display">
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Fetching weather data...</p>
                </div>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="weather-display">
                <p className="no-data">No data available. Please check the city name.</p>
            </div>
        );
    }

    return (
        <div className="weather-display">
            <h2>
                {weather.location.name}, {weather.location.region}
            </h2>
            <h2>{weather.location.country}</h2>
            <div className="weather-info">
                <img
                    src={`https:${weather.current.condition.icon}`}
                    alt={weather.current.condition.text}
                />
                <div className="weather-details">
                    <p className="temp">
                        Temperature: {weather.current.temp_c}°C / {weather.current.temp_f}°F
                    </p>
                    <p className="time">Local Time: {weather.location.localtime}</p>
                    <p className="condition">Weather: {weather.current.condition.text}</p>
                    <p className="humidity">Humidity: {weather.current.humidity}%</p>
                    <p className="wind-speed">Wind Speed: {weather.current.wind_kph} km/h</p>
                    <p className="feels-like">Feels Like: {weather.current.feelslike_c}°C</p>
                    <p className="dew-point">Dew Point: {weather.current.dewpoint_c}°C</p>
                    <p className="pressure">Pressure: {weather.current.pressure_mb} hPa</p>
                    <p className="precipitation">Precipitation: {weather.current.precip_mm} mm</p>
                    <p className="visibility">Visibility: {weather.current.vis_km} km</p>
                    <p className="gust">Gust: {weather.current.gust_kph} km/h</p>
                    <p className="heatindex">Heat Index: {weather.current.heatindex_c}°C</p>
                    <p className="gass">Nitrogen (NO2): {weather.current.air_quality.no2} μg/m3</p>
                    <p className="gass">Carbon Monoxide (CO): {weather.current.air_quality.co} μg/m3</p>
                    <p className="gass">Ozone (O3): {weather.current.air_quality.o3} μg/m3</p>
                    <p className="last-updated">Last Updated: {weather.current.last_updated}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
