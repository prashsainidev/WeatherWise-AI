import React from 'react';
import { getWeatherRecommendations } from '../lib/recommendations';
import '../styles/WeatherRecommendations.css';

const WeatherRecommendations = ({ weather }) => {
    const recommendations = getWeatherRecommendations(weather);

    if (!weather?.current) {
        return (
            <section className="weather-recommendations weather-recommendations-empty">
                <div className="recommendations-header">
                    <span>Recommendations</span>
                    <h3>Daily guidance will appear here</h3>
                </div>
                <ul>
                    {recommendations.map((recommendation) => (
                        <li key={recommendation}>{recommendation}</li>
                    ))}
                </ul>
            </section>
        );
    }

    return (
        <section className="weather-recommendations">
            <div className="recommendations-header">
                <span>Recommendations</span>
                <h3>What to do next</h3>
            </div>
            <ul>
                {recommendations.map((recommendation) => (
                    <li key={recommendation}>{recommendation}</li>
                ))}
            </ul>
        </section>
    );
};

export default WeatherRecommendations;
