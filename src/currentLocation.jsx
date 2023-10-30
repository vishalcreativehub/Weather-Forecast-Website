import React, { useEffect, useState } from "react";
import apiKeys from "./apiKeys";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
function Weather() {
  const [cityW,setCity] = useState("");
  const [state,setValue] = useState({
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString(undefined, { hour12: false });

  function getLocation() {
    if (cityW == "") {
      if (navigator.geolocation) {
        getPosition()
          //If user allow location service then will fetch data & send it to get-weather function.
          .then((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
          })
          .catch((err) => {
            //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
            getWeather(28.67, 77.22);
            alert(
              "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
            );
          });
      } else {
        alert("Geolocation not available");
      }
      clearInterval();
    }else {
      getWeather(0.000,0.0000);
    }
  }
  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  const getWeather = async (lat, lon) => {
    if (cityW !== "") {
      const api_call2 = await fetch(
        `${apiKeys.base}weather?q=${cityW}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await api_call2.json();
      state.lat = lat;
      state.lon = lon;
      state.city = data.name;
      state.temperatureC = Math.round(data.main.temp);
      state.temperatureF = Math.round(data.main.temp * 1.8 + 32);
      state.humidity = data.main.humidity;
      state.main = data.weather[0].main;
      state.country = data.sys.country;
      switch (state.main) {
        case "Haze":
          state.icon = "CLEAR_DAY";
          break;
        case "Clouds":
          state.icon =  "CLOUDY";
          break;
        case "Rain":
          state.icon =  "RAIN";
          break;
        case "Snow":
          state.icon =  "SNOW";
          break;
        case "Dust":
          state.icon =  "WIND";
          break;
        case "Drizzle":
          state.icon =  "SLEET";
          break;
        case "Fog":
          state.icon =  "FOG";
          break;
        case "Smoke":
          state.icon =  "FOG";
          break;
        case "Tornado":
          state.icon =  "WIND";
          break;
        default:
          state.icon =  "CLEAR_DAY";
      }
      setValue(prevState => (
        {...prevState,...state}
      )
      );
    }else {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await api_call.json();
      state.lat = lat;
      state.lon = lon;
      state.city = data.name;
      state.temperatureC = Math.round(data.main.temp);
      state.temperatureF = Math.round(data.main.temp * 1.8 + 32);
      state.humidity = data.main.humidity;
      state.main = data.weather[0].main;
      state.country = data.sys.country;
      switch (state.main) {
        case "Haze":
          state.icon = "CLEAR_DAY";
          break;
        case "Clouds":
          state.icon =  "CLOUDY";
          break;
        case "Rain":
          state.icon =  "RAIN";
          break;
        case "Snow":
          state.icon =  "SNOW";
          break;
        case "Dust":
          state.icon =  "WIND";
          break;
        case "Drizzle":
          state.icon =  "SLEET";
          break;
        case "Fog":
          state.icon =  "FOG";
          break;
        case "Smoke":
          state.icon =  "FOG";
          break;
        case "Tornado":
          state.icon =  "WIND";
          break;
        default:
          state.icon =  "CLEAR_DAY";
      }
      setValue(prevState => (
        {...prevState,...state}
      )
      );
    }
    
  };

  useEffect (() => {
    setInterval(1000);
    getLocation();
  },[cityW]);

  if (state.temperatureC) {
    return (
      <React.Fragment>
        <div className="city">
          <div className="title">
            <h2>{state.city}</h2>
            <h3>{state.country}</h3>
          </div>
          <div className="mb-icon">
            {" "}
            <ReactAnimatedWeather
              icon={state.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p>{state.main}</p>
          </div>
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                {formattedTime}
              </div>
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {state.temperatureC}°<span>C</span>
              </p>
              {/* <span className="slash">/</span>
              {state.temperatureF} &deg;F */}
            </div>
          </div>
        </div>
        <Forcast icon={state.icon} weather={state.main} setCity={setCity}/>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>
          Your current location wil be displayed on the App <br></br> & used
          for calculating Real time weather.
        </h3>
      </React.Fragment>
    );
  }
}


export default Weather;
