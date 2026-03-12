import React from "react";
import "../styles/WeatherDisplay.css";

const WeatherDisplay = ({ weather, loading }) => {
    const airQuality = weather?.current?.air_quality;

    if (loading) {
        return (
            <section className="weather-display weather-display-loading">
                <div className="loader-container">
                    <div className="loader"></div>
                    <p className="loading-text">Fetching weather data...</p>
                </div>
            </section>
        );
    }

    if (!weather) {
        return (
            <section className="weather-display weather-display-empty">
                <span className="weather-section-label">Current conditions</span>
                <h2>Search a city to get started.</h2>
                <p className="no-data">
                    Your weather summary will appear here with temperature, local time, and air quality.
                </p>
                <div className="weather-empty-preview">
                    <span>Temperature</span>
                    <span>Feels like</span>
                    <span>Air quality</span>
                </div>
            </section>
        );
    }

    const metrics = [
        { label: "Humidity", value: `${weather.current.humidity}%` },
        { label: "Wind speed", value: `${weather.current.wind_kph} km/h` },
        { label: "Pressure", value: `${weather.current.pressure_mb} hPa` },
        { label: "Visibility", value: `${weather.current.vis_km} km` },
        { label: "Precipitation", value: `${weather.current.precip_mm} mm` },
        { label: "Gusts", value: `${weather.current.gust_kph} km/h` },
        { label: "Feels like", value: `${weather.current.feelslike_c} degC` },
        { label: "Dew point", value: `${weather.current.dewpoint_c} degC` },
        { label: "Heat index", value: `${weather.current.heatindex_c} degC` },
        { label: "NO2", value: airQuality ? `${Math.round(airQuality.no2)} ug/m3` : "N/A" },
        { label: "CO", value: airQuality ? `${Math.round(airQuality.co)} ug/m3` : "N/A" },
        { label: "O3", value: airQuality ? `${Math.round(airQuality.o3)} ug/m3` : "N/A" },
    ];

    return (
        <section className="weather-display weather-display-ready">
            <div className="weather-spotlight">
                <div className="weather-overview">
                    <div className="weather-overview-copy">
                        <span className="weather-section-label">Current conditions</span>
                        <h2>
                            {weather.location.name}, {weather.location.region}
                        </h2>
                        <p className="weather-location-meta">
                            {weather.location.country} . Local time {weather.location.localtime}
                        </p>
                        <div className="weather-temp-row">
                            <p className="temp">{weather.current.temp_c} degC</p>
                            <span>{weather.current.temp_f} degF</span>
                        </div>
                        <p className="weather-summary">{weather.current.condition.text}</p>
                    </div>

                    <div className="weather-status-card">
                        <img
                            src={`https:${weather.current.condition.icon}`}
                            alt={weather.current.condition.text}
                        />
                        <strong>{weather.current.condition.text}</strong>
                        <span>Updated {weather.current.last_updated}</span>
                    </div>
                </div>

                <div className="weather-quick-strip">
                    <article>
                        <span>Feels like</span>
                        <strong>{weather.current.feelslike_c} degC</strong>
                    </article>
                    <article>
                        <span>Humidity</span>
                        <strong>{weather.current.humidity}%</strong>
                    </article>
                    <article>
                        <span>Wind</span>
                        <strong>{weather.current.wind_kph} km/h</strong>
                    </article>
                </div>
            </div>

            <div className="weather-metrics-grid">
                {metrics.map((metric) => (
                    <article key={metric.label} className="weather-metric-card">
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default WeatherDisplay;
