// WeatherWidget.js
import React, { useState } from "react";
import "./WeatherWidget.css";

const api = {
  key: "d8f32f1f36bc3bbbd1360a9cb8906193",
  base: "https://api.openweathermap.org/data/3.0/",
};

function WeatherWidget() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      });
  };

  return (
    <div className="weather-widget card">
      <div className="card-body">
        {/* HEADER  */}
        <h5 className="card-title">Weather App</h5>

        {/* Search Box - Input + Button  */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={searchPressed}>
            Search
          </button>
        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location  */}
            <p className="card-text">{weather.name}</p>

            {/* Temperature Celsius  */}
            <p className="card-text">{weather.main.temp}°C</p>

            {/* Condition (Sunny ) */}
            <p className="card-text">{weather.weather[0].main}</p>
            <p className="card-text">({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default WeatherWidget;
