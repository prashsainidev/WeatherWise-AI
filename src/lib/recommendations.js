export const getWeatherRecommendations = (weather) => {
    if (!weather?.current) {
        return [
            'Search for a city to see clothing advice and simple planning tips.',
            'Recommendations update automatically from the current temperature, wind, and conditions.',
        ];
    }

    const temperature = weather.current.temp_c;
    const condition = weather.current.condition.text.toLowerCase();
    const windSpeed = weather.current.wind_kph;
    const humidity = weather.current.humidity;
    const recommendations = [];

    if (temperature <= -10) {
        recommendations.push('It is extremely cold outside. Wear thermal layers, a heavy coat, and gloves.');
    } else if (temperature <= -5) {
        recommendations.push("It's freezing outside. Wear a heavy jacket and keep yourself warm.");
    } else if (temperature < 0) {
        recommendations.push('It is below freezing. Wear warm layers and watch for icy conditions.');
    } else {
        if (temperature > 30) {
            recommendations.push("It's really hot outside. Stay hydrated and wear light clothing.");
        }

        if (temperature < 10) {
            recommendations.push('It is chilly out. A warm jacket and gloves will help.');
        }

        if (condition.includes('rain')) {
            recommendations.push('Rain is in the air. Keep an umbrella or waterproof layer nearby.');
        }

        if (windSpeed > 20) {
            recommendations.push('It is quite windy. Secure loose items and expect a brisk feel outdoors.');
        }

        if (humidity > 80) {
            recommendations.push('Humidity is high. Choose lighter clothing and take it easy.');
        }

        if (condition.includes('sunny') || condition.includes('partly cloudy')) {
            recommendations.push('Skies look friendly. It is a good moment for a walk or time outside.');
        }
    }

    return recommendations.length
        ? recommendations
        : ['Conditions look balanced right now. A light layer should be enough for most plans.'];
};
