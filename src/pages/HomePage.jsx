import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import WeatherRecommendations from '../components/WeatherRecommendations';
import RecentSearches from '../components/RecentSearches';
import PageHeading from '../components/PageHeading';
import { loadRecentCities, mergeRecentCities, saveRecentCities } from '../lib/recentCities';
import { fetchCurrentWeather, searchCities } from '../lib/weatherApi';
import '../styles/HomePage.css';

const Home = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentCities, setRecentCities] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setRecentCities(loadRecentCities());
    }, []);

    const handleCityChange = async (value) => {
        setCity(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        try {
            const nextSuggestions = await searchCities(value);
            setSuggestions(nextSuggestions);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
            setSuggestions([]);
        }
    };

    const handleCitySelect = (selectedCity) => {
        setCity(selectedCity);
        setSuggestions([]);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            setWeather(null);

            const nextWeather = await fetchCurrentWeather(city);
            const updatedRecentCities = mergeRecentCities(recentCities, city);

            setWeather(nextWeather);
            setRecentCities(updatedRecentCities);
            saveRecentCities(updatedRecentCities);
        } catch (error) {
            alert(error.message || 'Error fetching weather data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const deleteRecentCity = (cityToDelete) => {
        const updatedRecentCities = recentCities.filter((recentCity) => recentCity !== cityToDelete);
        setRecentCities(updatedRecentCities);
        saveRecentCities(updatedRecentCities);
    };

    return (
        <div className="home-page">
            <PageHeading
                title="Weather dashboard"
                subtitle="Check current conditions, air quality, and local time for any city in one clean view."
                eyebrow="Live weather"
            />

            <section className="home-hero-grid">
                <div className="home-search-shell">
                    <div className="home-ambient-glow"></div>
                    <SearchBar
                        city={city}
                        handleCityChange={handleCityChange}
                        handleCitySelect={handleCitySelect}
                        handleSearch={handleSearch}
                        suggestions={suggestions}
                    />
                    <div className="home-search-note">
                        <p>Start with any city to reveal live conditions, local time, and air-quality context.</p>
                    </div>
                    <div className="home-insight-row">
                        <article>
                            <strong>{weather ? weather.location.name : "Realtime lookup"}</strong>
                            <span>{weather ? weather.current.condition.text : "Fast city search and live conditions"}</span>
                        </article>
                        <article>
                            <strong>{weather ? `${weather.current.temp_c} degC` : "Comfort metrics"}</strong>
                            <span>{weather ? `Feels like ${weather.current.feelslike_c} degC` : "Temperature, humidity, wind, and pressure"}</span>
                        </article>
                        <article>
                            <strong>{weather ? weather.location.localtime : "Smart guidance"}</strong>
                            <span>{weather ? "Updated local snapshot" : "Actionable suggestions for daily planning"}</span>
                        </article>
                    </div>
                </div>

                <aside className="home-highlights-card">
                    <span className="home-panel-label">Overview</span>
                    <h2>Everything you need for today's weather.</h2>
                    <div className="home-atmosphere-band">
                        <div className="atmosphere-core">
                            <span>In one place</span>
                            <strong>Current weather, air quality, and local time</strong>
                        </div>
                        <div className="atmosphere-mini-stack">
                            <span className="mini-chip">Live conditions</span>
                            <span className="mini-chip">Quick planning</span>
                        </div>
                    </div>
                    <div className="home-highlight-grid">
                        <div>
                            <strong>{weather ? `${weather.current.humidity}% humidity` : "Current conditions"}</strong>
                            <span>{weather ? `Wind ${weather.current.wind_kph} km/h` : "Temperature, wind, and humidity stay easy to scan."}</span>
                        </div>
                        <div>
                            <strong>{weather ? weather.current.condition.text : "Local context"}</strong>
                            <span>{weather ? weather.location.country : "See the city, region, country, and local time together."}</span>
                        </div>
                        <div>
                            <strong>{weather ? `Air quality included` : "Practical guidance"}</strong>
                            <span>{weather ? "Air quality is included in the same snapshot." : "Get simple recommendations based on the latest conditions."}</span>
                        </div>
                    </div>
                </aside>
            </section>

            <section className="home-current-conditions-row">
                <WeatherDisplay weather={weather} loading={loading} />
            </section>

            <section className="home-support-grid">
                <WeatherRecommendations weather={weather} />
                <RecentSearches recentCities={recentCities} deleteRecentCity={deleteRecentCity} />
            </section>
        </div>
    );
};

export default Home;
