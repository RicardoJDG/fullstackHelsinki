import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
  const [currentWeather, setCurrentWeather] = useState('');

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`
      )
      .then((response) => {
        setCurrentWeather(response.data);
      });
  }, [country]);

  return (
    currentWeather && (
      <div>
        <h2>Weather in {country}</h2>
        <p>
          <strong>temperature: {currentWeather.current.temperature}</strong>
        </p>
        <img
          src={currentWeather.current.weather_icons}
          alt={currentWeather.location.name}
        />
        <p>
          <strong>
            wind: {currentWeather.current.wind_speed}mph direction{' '}
            {currentWeather.current.wind_dir}
          </strong>
        </p>
      </div>
    )
  );
};

export default Weather;
