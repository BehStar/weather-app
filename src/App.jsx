import { useState } from "react";
import InputCity from "./components/InputCity";
import Weather from "./components/Weather";

export default function App() {
  const [cityName, setCityName] = useState("");

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Discoevr the weather in every city you go</h1>
        <InputCity setCityName={setCityName} cityName={cityName} />
        <div className='img'> hi</div>
      </div>
      <Weather cityName={cityName} />

    </div>
  );
}
