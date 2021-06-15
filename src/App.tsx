import React, { useEffect, useState } from "react";
import "./app.css";
import { DailyWrapper } from "./DailyWrapper";

export function App() {
  const [city, setCity] = useState("Vilnius");
  // const [cityData, setCityData] = useState({lon: 25.2798, lat: 54.689});
  const [weatherData, setWeatherData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=4868c3b126a7a3cac48a93a3b1d80382&q=${city}`
    )
      .then((res) => res.json())
      // .then(res=> return {setCityData({
      //     lon: res.coord.lon,
      //     lat: res.coord.lat
      // });
      //    return res; })
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?appid=4868c3b126a7a3cac48a93a3b1d80382&units=metric&lat=${res.coord.lat}&lon=${res.coord.lon}&exclude=hourly`
        )
      )
      .then((res) => res.json())
      .then((res) => {
        setWeatherData(res.daily);
        setIsLoaded(true);
        console.log(res);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [city]);

  /*     useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4868c3b126a7a3cac48a93a3b1d80382`)
            .then(res => res.json())
            .then(res=> {
                setCityData({
                    lon: res.coord.lon,
                    lat: res.coord.lat
                });
                console.log(res);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            })
    }, [city]);

    useEffect(() => {
        //API key: 4868c3b126a7a3cac48a93a3b1d80382
        // {lon: 25.2798, lat: 54.6892}
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityData.lat}&lon=${cityData.lon}&units=metric&appid=4868c3b126a7a3cac48a93a3b1d80382`)
            .then(res => res.json())
            .then(res => {
                setWeatherData(res);
                setIsLoaded(true);
                console.log(res);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            })
    }, [cityData]); */

  if (error) {
    return <div>Error: </div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="app">
          <h1>Another lovely day in </h1>
          <input
            onBlur={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCity((e.target as HTMLInputElement).value);
              }
            }}
            placeholder={city}
            className="city-name"
          ></input>
          <DailyWrapper daily={weatherData} />
        </div>
      </>
    );
  }
}
