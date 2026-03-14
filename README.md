# WeatherWise AI

<div align="center">
  <img src="./public/assets/favicon.svg" alt="WeatherWise AI Banner" width="120"/>
</div>

**WeatherWise AI** is a modern, full-featured weather application that delivers real-time weather updates, multi-city comparisons, and climate trends using cutting-edge web technologies. Built with React, React Router, and Vite on the frontend and leveraging secure serverless functions on Vercel, this project demonstrates a strong grasp of modern web development, API integration, and scalable architecture.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Highlights](#technical-highlights)
- [Architecture & Design](#architecture--design)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Live Demo](#live-demo)

---

## Overview

WeatherWise AI provides accurate and real-time weather information for any city worldwide with a multi-page dashboard experience. Users can search for locations, view detailed weather metrics (temperature, humidity, wind speed, air quality, and more), compare multiple cities simultaneously, and review climate trends. By using serverless functions to fetch data securely, the app ensures that sensitive API keys remain hidden and minimizes CORS issues—an approach that highlights best practices in secure API integration and modern deployment.

---

## Features

- **Multi-Page Architecture:** Navigate seamlessly between the **Forecast Studio** (Home), **City Compare** (Global Comparison), and **Climate Lens** (Climate Trends) using robust client-side routing.
- **Smart Suggestions:** Quickly find weather data for any city using real-time search suggestions.
- **Detailed Weather Display:** View comprehensive weather metrics including temperature (°C/°F), humidity, wind speed, local time, and air quality.
- **Global City Comparison:** Compare current weather conditions, comfort metrics, and air quality for multiple cities side-by-side.
- **Climate Trends:** Review short-term temperature, wind, pressure, and visibility data for selected locations.
- **Recent Searches:** Automatically store and display your last five searched cities.
- **Serverless API Integration:** Utilize Vercel serverless functions to securely fetch weather data without exposing API keys.
- **Responsive & Modern UI:** A clean, intuitive design built with React and custom CSS that performs seamlessly on both desktop and mobile devices.

---

## Technical Highlights

This project is a showcase of modern web development techniques and technical acumen:

- **React & Vite:** Fast, efficient, and modern frontend development.
- **React Router:** Client-side routing for uninterrupted navigation between Forecast Studio, City Compare, and Climate Lens.
- **Serverless Architecture:** Secure data fetching using Vercel's serverless functions, which abstracts backend logic and protects sensitive credentials.
- **API Integration:** Seamless consumption of WeatherAPI for real-time weather data and climate trends.
- **Responsive Design & UI/UX:** Custom CSS for a responsive, modern, and user-friendly interface.
- **Robust Error Handling:** Comprehensive error management and user feedback throughout the application.

---

## Architecture & Design

**WeatherWise AI** is designed with a clear separation of concerns:

- **Frontend:** Built with React, React Router, and Vite. The user interface is organized into modular pages (`HomePage`, `GlobalComparisonPage`, `ClimateChangePage`) and reusable components, promoting maintainability.
- **Backend (Serverless Functions):** API calls are handled by Vercel serverless functions (e.g., `fetchWeather.js`), ensuring that sensitive API keys are not exposed to the client and that CORS issues are mitigated.
- **Data Flow:** The client communicates with the serverless functions which, in turn, interface with external APIs (WeatherAPI). This layered approach enhances security and scalability.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prashantsaini1525/WeatherWise-AI.git
   cd weatherwise-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**

- Create a `.env` file in the root directory and add:

  ```bash
  VITE_API_KEY=your_weatherapi_key
  ```

- **Note:** For production, set these variables in the Vercel Dashboard under Project Settings → Environment Variables.

4. **Run the App Locally:**

   ```bash
   npm run dev
   ```

   - Visit http://localhost:3000 (or the port Vite provides) in your browser.

---

# Environment Variables

To run WeatherWise AI successfully, you'll need to configure the following environment variables:

## VITE_API_KEY

Your WeatherAPI key is required for fetching weather data. For local development, create a `.env` file in the project root and add `VITE_API_KEY=your_weatherapi_key`.

For production deployments (e.g., on Vercel), set these environment variables in the platform’s dashboard under the project settings.

---

# Deployment

WeatherWise AI is optimized for deployment with Vercel. Follow these steps to deploy:

## Connect Your Repository

- **Sign in to your [Vercel account](https://vercel.com/).**
- **Import your WeatherWise AI repository from GitHub.**
- **Vercel will auto-detect the Vite (React) configuration.**

## Configure Environment Variables

- **Navigate to your project settings in the Vercel Dashboard.**
- **Add the required environment variables (e.g., `VITE_API_KEY`).**

## Automatic Deployments

- **Every push to your connected branch triggers a new deployment.**
- **Once deployed, access your app via the URL provided by Vercel.**

---

# Future Enhancements

WeatherWise AI is a work in progress with plans for continuous improvement. Future enhancements include:

- **Advanced Forecasting:** Integrate extended forecasts and historical weather data for more in-depth insights.
- **User Personalization:** Implement user accounts to save favorite locations and enable custom weather notifications.
- **UI/UX Improvements:** Enhance the interface with features like dark mode and additional accessibility options.
- **Multi-language Support:** Add internationalization to make the app accessible to a global audience.

---

# Contributing

Contributions are welcome! If you’d like to help improve WeatherWise AI, please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch:** `git checkout -b feature/your-feature-name`
3. **Commit Your Changes:** Write clear, concise commit messages.
4. **Push Your Branch:** `git push origin feature/your-feature-name`
5. **Open a Pull Request:** Provide a detailed description of your changes and submit a PR for review.

---

# License

WeatherWise AI is open source and distributed under the MIT License.  
For more details, please see the [LICENSE](./LICENSE) file.

---

# Live Demo

Experience WeatherWise AI in action at:  
[WeatherWise AI Live Demo](https://weather-wise-ai.vercel.app/)

> **Note:** Replace the demo URL with your actual deployed application's link.
