import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherDisplay from "../components/WeatherDisplay";
import WeatherRecommendations from "../components/WeatherRecommendations";
import RecentSearches from "../components/RecentSearches";
import PageHeading from "../components/PageHeading";
import "../styles/HomePage.css";

const Home = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentCities, setRecentCities] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const savedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
        setRecentCities(savedCities);
    }, []);

    const handleCityChange = async (value) => {
        setCity(value);
        const apiKey = import.meta.env.VITE_API_KEY;

        if (value.trim() && apiKey) {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value.trim()}`
                );
                const data = await response.json();
                setSuggestions(data || []);
            } catch (error) {
                console.error("Error fetching city suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleCitySelect = (selectedCity) => {
        setCity(selectedCity);
        setSuggestions([]);
    };

    const handleSearch = async () => {
        setLoading(true);
        setWeather(null);
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!city) {
            alert("Please enter a city name!");
            setLoading(false);
            return;
        }
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                alert("City not found!");
            } else {
                setWeather(data);
                const updatedCities = [city, ...recentCities].slice(0, 5);
                setRecentCities(updatedCities);
                localStorage.setItem("recentCities", JSON.stringify(updatedCities));
            }
        } catch (error) {
            alert("Error fetching weather data. Please try again later.");
        }
        setLoading(false);
    };

    const deleteRecentCity = (cityToDelete) => {
        const updatedCities = recentCities.filter((c) => c !== cityToDelete);
        setRecentCities(updatedCities);
        localStorage.setItem("recentCities", JSON.stringify(updatedCities));
    };

    return (
        <div>
            <PageHeading
                title="WeatherWise AI"
                subtitle="Get accurate, real-time weather updates powered by AI!"
            />

            {/* SearchBar Component */}
            <SearchBar
                city={city}
                handleCityChange={handleCityChange}
                handleCitySelect={handleCitySelect}
                handleSearch={handleSearch}
                suggestions={suggestions}
            />

            <WeatherDisplay weather={weather} loading={loading} />
            <WeatherRecommendations weather={weather} />
            <RecentSearches recentCities={recentCities} deleteRecentCity={deleteRecentCity} />
        </div>
    );
};

export default Home;
