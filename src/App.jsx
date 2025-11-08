import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { fetchWeatherData } from "./api/weather";
import './App.css';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Lagos");

  async function getWeather(cityName) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(cityName, apiKey);
      console.log(data);
      setWeather(data);
    } catch (err) {
      setError("Could not fetch weather. Check city name or try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(cityName) {
    setCity(cityName);
  }

  useEffect(() => {
    getWeather(city);
  }, [city]);

  return (
    <div className={`weather-container ${loading ? "loading" : ""}`}>
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
