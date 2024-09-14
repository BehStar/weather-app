import { useState, useEffect } from "react";

import styles from "./InputCity.module.css";
import { FaSearchengin } from "react-icons/fa6";

const InputCity = ({ setCityName }) => {
  const [inputValue, setInputValue] = useState("");
  const [cities, setCities] = useState([]);
  const [suggestion, setSuggestion] = useState("search for a city");

  // change Input
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Tab key press
  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      setInputValue(suggestion);
    }
  };

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await fetch("/cities.json");
        const data = await res.json();
        setCities(data);
        setSuggestion(data[0] || ""); 
      } catch (e) {
        console.log(e);
      }
    };
    getCities();
  }, []);

  useEffect(() => {
    const filterCities = cities.filter((c) => c.startsWith(inputValue)); 
    setSuggestion(filterCities[0] || "");
  }, [inputValue, cities]);

  // Submit Form Handler
  const submitFormHandler = (e) => {
    e.preventDefault();
    setCityName(inputValue.toLowerCase());
    setInputValue("");
  };

  return (
    <div>
      <form onSubmit={submitFormHandler} className={styles.form}>
        <div className={styles.inputWrapper}>
          <label htmlFor="input">{suggestion}</label>
          <input
            type="text"
            id="input"
            onChange={handleChange}
            value={inputValue}
            onKeyDown={handleKeyDown}
            autoComplete="off" 
          />
        </div>
        <button type="submit" className={styles.btnSearch}>
          <FaSearchengin />
        </button>
      </form>
    </div>
  );
};

export default InputCity;
