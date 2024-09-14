import { useState, useEffect } from "react";

import Loading from "./Loading";

import styles from "./Weather.module.css";
const Weather = ({ cityName }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCentigrade, setIsCentigrade] = useState(false);
  const [isKmPerH, setIsKmPerH] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      try {
        if (cityName !== "") {
          setIsLoading(true);
          const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=5a76179902a14d30800103750201112&q=${cityName}`
          );

          if (!res.ok) {
            throw new Error(
              "Failed to fetch weather data. Please check the city name."
            );
          }

          const data = await res.json();
          setWeatherInfo(data);
          setError(null); 
        }
      } catch (e) {
        console.error(e);
        setError(e.message);
        setWeatherInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    getWeather();
  }, [cityName]);

  useEffect(() => {
    if (weatherInfo) {
      console.log(weatherInfo);
    }
  }, [weatherInfo]);
  if (weatherInfo == undefined) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.noSelectedCityMessage}>
          <p>Dicover a city valid</p>
        </div>
      </div>
    );
  }
  if (isLoading) return <Loading />;

  return (
    <div className={styles.wrapper}>
      {/* {isLoading && <Loading />} */}
      {/* <Loading /> */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherInfo && (
        <div
          className={
            weatherInfo?.current.is_day
              ? styles.wrapperDay
              : styles.wrapperNight
          }
        >
          {/* Location & UV & Buttons (c-f & km/h-m/h) */}
          <div className={styles.btnsLocWrapper}>
            {/* Location */}
            <div className={styles.locationWrapper}>
              <p>Location</p>
              <h6>
                {weatherInfo?.location.name} , {weatherInfo?.location.region} ,{" "}
                {weatherInfo?.location.country}
              </h6>
            </div>
            <div className={styles.uvBtnsWrapper}>
              <div className={styles.uvWrapper}>
                <div className={styles.uvIndex}>
                  <p>UV</p>
                  <p>index</p>
                  <h3>{weatherInfo?.current.uv}</h3>
                </div>
                <div className={styles.uvTable}>
                  <div className={styles.color}></div>
                  <p>Low (&lt; 2)</p>
                  <div className={styles.color}></div>
                  <p>Moderate (3 to 5)</p>
                  <div className={styles.color}></div>
                  <p>High (6 to 7)</p>
                  <div className={styles.color}></div>
                  <p>Very High (8 to 10)</p>
                  <div className={styles.color}></div>
                  <p>Extereme (11+)</p>
                </div>
              </div>
              {/* BUTTONS */}
              <div className={styles.btnsBox}>
                <div className={styles.btnsWrapper}>
                  <button onClick={() => setIsCentigrade(true)}>
                    {String.fromCharCode(176)}C
                  </button>
                  <button onClick={() => setIsCentigrade(false)}>
                    {String.fromCharCode(176)}F
                  </button>
                  <div
                    className={isCentigrade ? styles.showOn : styles.showOff}
                  />
                </div>
                <div className={styles.btnsWrapper}>
                  <button onClick={() => setIsKmPerH(true)}>km/h</button>
                  <button onClick={() => setIsKmPerH(false)}>m/h</button>
                  <div className={isKmPerH ? styles.showOn : styles.showOff} />
                </div>
              </div>
            </div>
          </div>
          {/* INFO & BOXES */}
          <div className={styles.infoBoxesWrapper}>
            {/* INFO */}
            <div className={styles.infoWrapper}>
              {/* Time & Condition*/}
              <div className={styles.timeConditionWrapper}>
                <div className={styles.timeWrapper}>
                  <p>
                    {new Date(
                      weatherInfo?.location.localtime
                    ).toLocaleDateString("en-US", { weekday: "long" })}
                  </p>
                  <p>
                    {new Date(
                      weatherInfo?.location.localtime
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className={styles.condition}>
                  <h3> {weatherInfo?.current.condition.text}</h3>
                </div>
              </div>
              <div className={styles.tempreture}>
                <img
                  src={weatherInfo?.current.condition.icon}
                  alt="ye chizin"
                />
                <div>
                  <h3>
                    {" "}
                    {isCentigrade
                      ? weatherInfo?.current.temp_c
                      : weatherInfo?.current.temp_f}
                    <span className={styles.degree}>
                      {isCentigrade ? "°C" : "°F"}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            {/* BOXES */}
            <div className={styles.boxes}>
              {/* Humidity */}
              <div className={styles.eachBox}>
                <h4>Humidity</h4>
                <p>{weatherInfo?.current.humidity}%</p>
              </div>
              {/* Cloud */}
              <div className={styles.eachBox}>
                <h4>Cloud Cover</h4>
                <p>{weatherInfo?.current.cloud}%</p>
              </div>
              {/* Peak Wind Gust */}
              <div className={styles.eachBox}>
                <h4>Peak Wind Gust</h4>
                <p>
                  {isKmPerH
                    ? `${weatherInfo?.current.gust_kph} km/h`
                    : `${weatherInfo?.current.gust_mph} m/h`}
                </p>
              </div>
              {/* Feels Like */}
              <div className={styles.eachBox}>
                <h4>Feels Like</h4>
                <p>
                  {isCentigrade
                    ? `${weatherInfo?.current.feelslike_c} °C`
                    : `${weatherInfo?.current.feelslike_f} °F`}
                </p>
              </div>
              {/* Wind */}
              <div className={styles.eachBox}>
                <h4>Wind</h4>
                <p>
                  {isKmPerH
                    ? `${weatherInfo?.current.wind_kph} km/h`
                    : `${weatherInfo?.current.wind_mph} m/h`}
                </p>
              </div>
              {/* Current Precipitation */}
              <div className={styles.eachBox}>
                <h4>Current Precipitation</h4>
                <p>{weatherInfo?.current.precip_mm}mm</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
