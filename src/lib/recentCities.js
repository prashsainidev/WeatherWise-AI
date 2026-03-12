const RECENT_CITIES_STORAGE_KEY = 'recentCities';
export const MAX_RECENT_CITIES = 5;

export const loadRecentCities = () => {
    try {
        const storedValue = localStorage.getItem(RECENT_CITIES_STORAGE_KEY);
        return storedValue ? JSON.parse(storedValue) : [];
    } catch (error) {
        console.error('Failed to read recent cities:', error);
        return [];
    }
};

export const saveRecentCities = (cities) => {
    localStorage.setItem(RECENT_CITIES_STORAGE_KEY, JSON.stringify(cities));
};

export const mergeRecentCities = (cities, nextCity, limit = MAX_RECENT_CITIES) => {
    const normalizedCity = nextCity.trim();

    if (!normalizedCity) {
        return cities;
    }

    return [normalizedCity, ...cities.filter((city) => city !== normalizedCity)].slice(0, limit);
};
