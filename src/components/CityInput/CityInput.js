import { useState } from "react";
import { getCoordinates } from "../../utils/geocodingApi";
import { openCageGeocodingAPIKey } from "../../utils/constants";

const CityInput = ({ onCityChange, onCoordinatesChange, currentCityValue }) => {
  const [city, setCity] = useState(currentCityValue);
  const [options, setOptions] = useState([]);
  const [multiChoice, setMultiChoice] = useState(false);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    onCityChange(value);
    if (value.length <= 1) {
      setMultiChoice(false);
    } else {
      getCoordinates(value, openCageGeocodingAPIKey)
        .then((data) => {
          if (data.results.length === 1) {
            onCoordinatesChange(data.results[0].geometry);
            setMultiChoice(false);
          } else if (data.results.length > 1) {
            const uniqueOptions = [
              ...new Set(data.results.map((option) => option.formatted)),
            ];
            setOptions(uniqueOptions);
            setMultiChoice(true);
          } else {
            setOptions(["No options found, please check the spelling"]);
            setMultiChoice(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleChoice = (e) => {
    const chosenCity = e.target.textContent;
    setCity(chosenCity);
    onCityChange(chosenCity);
    setMultiChoice(false);

    getCoordinates(chosenCity, openCageGeocodingAPIKey)
      .then((data) => {
        onCoordinatesChange(data.results[0].geometry);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <input
        className="modal__form-input"
        type="text"
        id="city"
        name="city"
        placeholder="City"
        value={city}
        onChange={handleCityChange}
        minLength={2}
        required
      />
      {multiChoice && (
        <ul className="modal__form-city-options">
          <h3 className="modal__form-title">Specify your city:</h3>
          {options[0].includes("No options found") ? (
            <p className="modal__form-city-option-warning">{options[0]}</p>
          ) : (
            options.map((option, index) => (
              <p
                key={index}
                onClick={handleChoice}
                className="modal__form-city-option-item"
              >
                {option}
              </p>
            ))
          )}
        </ul>
      )}
    </>
  );
};

export default CityInput;
