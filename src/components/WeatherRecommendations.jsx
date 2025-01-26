import React from "react";
import "../styles/WeatherRecommendations.css";

const WeatherRecommendations = ({ weather }) => {
    if (!weather || !weather.current) return null; // Don't render if weather data is not available

    const getRecommendations = () => {
        const temperature = weather.current.temp_c;
        const condition = weather.current.condition.text.toLowerCase();
        const windSpeed = weather.current.wind_kph;
        const humidity = weather.current.humidity;

        let recommendations = [];

        // First, handle extreme cold and cold weather, as they have higher priority
        if (temperature <= -10) {
            recommendations.push("It’s extremely cold outside! Be sure to wear thermal clothing, a heavy coat, and gloves.");
        } else if (temperature <= -5) {
            recommendations.push("It's freezing outside. Wear a heavy jacket and keep yourself warm!");
        } else if (temperature < 0) {
            recommendations.push("It’s below freezing. Be sure to wear warm clothes and watch for icy conditions.");
        } 

        // Then handle other conditions like hot weather, rainy, and windy
        else {
            // Hot Weather
            if (temperature > 30) {
                recommendations.push("It's really hot outside. Stay hydrated and wear light clothing!");
            }

            // Cold Weather (but not extreme)
            if (temperature < 10 && temperature >= 0) {
                recommendations.push("It’s chilly out. Wear a warm jacket and gloves.");
            }

            // Rainy Weather
            if (condition.includes("rain")) {
                recommendations.push("It’s raining. Don’t forget your umbrella!");
            }

            // Windy Weather
            if (windSpeed > 20) {
                recommendations.push("It’s quite windy. Secure any loose items outside.");
            }

            // Humid Weather
            if (humidity > 80) {
                recommendations.push("It’s humid. Stay cool and take it easy.");
            }

            // Sunny Weather (only if not already covered by the cold conditions)
            if (condition.includes("sunny") || condition.includes("partly cloudy")) {
                recommendations.push("It’s a beautiful day! Perfect for outdoor activities.");
            }
        }

        return recommendations;
    };

    return (
        <div className="weather-recommendations">
            <h3>Recommendations:</h3>
            <ul>
                {getRecommendations().map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherRecommendations;
