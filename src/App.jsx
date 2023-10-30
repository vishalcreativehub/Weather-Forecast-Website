import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <div>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://github.com/vishalcreativehub/Weather_Forecast_Website">
          Download Source Code
        </a>{" "}
        | Developed by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/vishalkumar45">
          Vishal Kumar
        </a>{" "}
        | Made with {" "}
        <a target="_blank" href="https://react.dev/">
          React
        </a>
      </div>
    </div>
  );
}

export default App;
