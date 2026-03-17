const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';
const OPEN_METEO_API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const readJson = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        const message = data?.error?.message || 'Request failed.';
        throw new Error(message);
    }

    return data;
};

const getWeatherApiKey = () => import.meta.env.VITE_API_KEY;

export const formatCityLabel = ({ name, region, country }) =>
    [name, region, country].filter(Boolean).join(', ');

export const searchCities = async (query) => {
    const apiKey = getWeatherApiKey();
    const trimmedQuery = query.trim();

    if (!trimmedQuery || !apiKey) {
        return [];
    }

    const response = await fetch(
        `${WEATHER_API_BASE_URL}/search.json?key=${apiKey}&q=${encodeURIComponent(trimmedQuery)}`
    );

    return readJson(response);
};

export const fetchCurrentWeather = async (city) => {
    const apiKey = getWeatherApiKey();
    const trimmedCity = city.trim();

    if (!trimmedCity) {
        throw new Error('Please enter a city name.');
    }

    if (!apiKey) {
        throw new Error('Weather API key is missing.');
    }

    const response = await fetch(
        `${WEATHER_API_BASE_URL}/current.json?key=${apiKey}&q=${encodeURIComponent(trimmedCity)}&aqi=yes`
    );

    return readJson(response);
};

export const fetchCityCoordinates = async (city) => {
    const apiKey = getWeatherApiKey();
    const trimmedCity = city.trim();

    if (!trimmedCity) {
        throw new Error('Please enter a city name.');
    }

    if (!apiKey) {
        throw new Error('Weather API key is missing.');
    }

    const response = await fetch(
        `${WEATHER_API_BASE_URL}/search.json?key=${apiKey}&q=${encodeURIComponent(trimmedCity)}`
    );
    const data = await readJson(response);
    const firstResult = data?.[0];

    if (!firstResult) {
        throw new Error('City not found.');
    }

    return {
        lat: firstResult.lat,
        lng: firstResult.lon
    };
};

export const fetchClimateForecast = async ({ latitude, longitude }) => {
    const response = await fetch(
        `${OPEN_METEO_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,wind_speed_10m,pressure_msl,uv_index,visibility`
    );

    return readJson(response);
};
