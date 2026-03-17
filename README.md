# WeatherWise AI

<div align="center">
  <img src="./public/assets/favicon.svg" alt="WeatherWise AI Banner" width="120"/>
</div>

**WeatherWise AI** is a modern, full-featured weather application that delivers real-time weather updates, multi-city comparisons, and hourly climate trends. Built with React, React Router, and Vite, this application demonstrates expertise in modern web development, API integration, state management, and responsive design across all devices.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Pages](#pages)
- [Technical Stack](#technical-stack)
- [Architecture & Design](#architecture--design)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Recent Fixes & Improvements](#recent-fixes--improvements)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Live Demo](#live-demo)

---

## Overview

WeatherWise AI provides accurate and real-time weather information for any city worldwide with a seamless multi-page experience. Users can search for locations, view detailed weather metrics, compare multiple cities simultaneously, and review hourly climate trends. The application features intelligent city suggestions, robust error handling, and a fully responsive design that works flawlessly on desktop, tablet, and mobile devices.

---

## Features

- ✨ **Multi-Page Architecture** - Seamless navigation between three dedicated pages using React Router
- 🔍 **Smart City Suggestions** - Real-time autocomplete dropdown as you type city names
- 📊 **Current Weather Display** - Temperature, humidity, wind speed, local time, and air quality metrics
- 🌍 **Global City Comparison** - Compare weather, comfort metrics, and air quality for up to 10 cities side-by-side
- 📈 **Climate Trends** - View hourly forecast data (temperature, wind, pressure, UV index, visibility)
- 🎨 **Modern, Responsive UI** - Beautiful gradient-based design that adapts perfectly to all screen sizes
- ⚡ **Fast & Optimized** - Built with Vite for lightning-fast development and production builds
- 🔒 **Secure API Integration** - Direct API calls with proper error handling
- 💾 **Recent Searches** - Automatically tracks your last searched cities
- 📱 **Tablet Optimized** - Special handling for tablet devices (768px breakpoint) with responsive tables

---

## Pages

### 1. **Forecast Studio** (Home)
- Live weather conditions for any city
- Search with auto-complete suggestions
- Display: Temperature, Humidity, Wind Speed, Feels Like, Local Time, Air Quality
- Recent searched cities tracker

### 2. **City Compare** (Global Comparison)
- Compare weather for multiple cities (up to 10)
- Side-by-side comparison table
- Metrics: Temperature, Condition, Humidity, Feels Like, Gas Levels, Status
- Swap and reset functionality
- Auto-suggestion dropdown for each city input

### 3. **Climate Lens** (Climate Trends)
- Hourly forecast for selected city
- Displays next 5 hours of data
- Metrics: Temperature, Precipitation, Wind Speed, Pressure, UV Index, Visibility
- Auto-suggestion dropdown for city search
- Color-coded tables for easy reading

---

## Technical Stack

- **Frontend:** React 18.3.1 + React Router 7.1.3 + Vite 6.0.5
- **Styling:** Custom CSS with gradient backgrounds and responsive design
- **APIs:** WeatherAPI for all weather data and city search
- **Deployment:** Vercel with automatic deployments
- **Dev Tools:** ESLint, Vite configuration

---

## Architecture & Design

**WeatherWise AI** follows modern web development best practices:

### Frontend Structure
```
src/
├── pages/           # HomePage, GlobalComparisonPage, ClimateChangePage
├── components/      # Reusable components (SearchBar, ClimateChange, etc.)
├── lib/            # API utility functions (weatherApi.js)
├── styles/         # Component-specific CSS files
└── App.jsx         # Main routing component
```

### Data Flow
1. User searches for a city
2. Client fetches data from WeatherAPI
3. Results are cached in component state
4. UI updates with real-time data
5. Error states handled gracefully

### Design Patterns
- **Component-based architecture** for reusability
- **Separation of concerns** - API logic separated from UI
- **State management** using React hooks (useState, useEffect)
- **Responsive design** with mobile-first approach
- **Consistent styling** across all pages

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prashantsaini1525/WeatherWise-AI.git
   cd weatherwise-ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory:

   ```bash
   VITE_API_KEY=your_weatherapi_key
   ```

4. **Run the App Locally:**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:5173` (or the port Vite provides) in your browser.

5. **Build for Production:**

   ```bash
   npm run build
   npm run preview
   ```

---

## Environment Variables

### VITE_API_KEY
Your WeatherAPI key is required for fetching weather data and city searches.

- **Get your key:** Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
- **Local development:** Add to `.env` file
- **Production (Vercel):** Set in Vercel Dashboard under Project Settings → Environment Variables

---

## Deployment

WeatherWise AI is optimized for Vercel deployment:

### Steps

1. **Push code to GitHub**
2. **Connect repository to Vercel:**
   - Sign in to [Vercel](https://vercel.com/)
   - Click "New Project" and import your GitHub repository
3. **Configure Environment Variables:**
   - In Vercel Dashboard: Project Settings → Environment Variables
   - Add `VITE_API_KEY` with your WeatherAPI key
4. **Deploy:**
   - Vercel auto-detects Vite configuration
   - Automatic deployments on every push to main branch

### Important Files

- **vercel.json** - Rewrites all routes to index.html for proper SPA routing
- **.env** - Local environment variables (add to .gitignore)

---

## Recent Fixes & Improvements

### Latest Updates (Current Session)

✅ **Fixed 404 Errors on Deployed App**
- Added `vercel.json` with route rewriting
- Now `/global-comparison` and `/climate-change` routes work properly on Vercel

✅ **Replaced OpenCage API with WeatherAPI**
- Removed 401 Unauthorized errors
- Single API key solution (WeatherAPI only)
- Simplified codebase

✅ **Fixed Climate Lens Data Fetching**
- Multiple searches now work correctly
- Direct API call in handleSearch instead of relying on useEffect
- Data loads consistently every time

✅ **Enhanced Climate Lens UI**
- Added city auto-suggestion dropdown
- Consistent design with other pages
- Loading and error states
- Improved table responsiveness

✅ **Fixed Tablet Responsiveness (768px)**
- Both Climate Lens and Global Comparison now display perfectly on tablets
- Proper table scrolling when needed
- Optimized padding and font sizes

---

## Future Enhancements

- 🌙 Dark mode toggle
- 📍 Geolocation-based weather
- 🔔 Weather alerts and notifications
- 📊 Extended forecasts (7-14 days)
- 🌐 Multi-language support
- 👤 User accounts for saved locations
- 📈 Weather history and trends analysis
- 🎯 Advanced filtering and analytics

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch:** `git checkout -b feature/your-feature-name`
3. **Commit Your Changes:** Write clear, descriptive commit messages
4. **Push Your Branch:** `git push origin feature/your-feature-name`
5. **Open a Pull Request:** Provide detailed description of changes

---

## License

WeatherWise AI is open source and distributed under the MIT License.

---

## Live Demo

Experience WeatherWise AI in action:

🚀 **[WeatherWise AI Live Demo](https://weather-wise-ai.vercel.app/)**

---

## Support

For issues, questions, or suggestions, please open an [GitHub Issue](https://github.com/prashantsaini1525/WeatherWise-AI/issues).

---

**Built with ❤️ using React, Vite, and WeatherAPI**
