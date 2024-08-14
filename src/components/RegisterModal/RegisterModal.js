import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getCoordinates } from "../../utils/geocodingApi";
import { openCageGeocodingAPIKey } from "../../utils/constants";

const RegisterModal = ({
  handleRegisterSubmit,
  onLogin,
  onCloseModal,
  buttonText,
}) => {
  const [multiChoice, setMultiChoice] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    userType: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    coordinates: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      if (data.coordinates) {
        handleRegisterSubmit(data);
      } else {
        handleCityChange(data.city).then((coordinates) => {
          if (coordinates) {
            handleRegisterSubmit({ ...data, coordinates });
          } else {
            console.log("Failed to get coordinates");
          }
        });
      }
    }
  };

  // work with geo location
  const handleCityChange = (city) => {
    return getCoordinates(city, openCageGeocodingAPIKey)
      .then((data) => {
        if (data.results.length === 1) {
          return data.results[0].geometry;
        } else if (data.results.length > 1) {
          const uniqueOptions = [
            ...new Set(data.results.map((option) => option.formatted)),
          ];
          setOptions(uniqueOptions);
          if (uniqueOptions.length > 1) {
            setMultiChoice(true);
          } else {
            setMultiChoice(false);
            return data.results[0].geometry;
          }
        } else {
          setOptions(["No options found, please check the spelling"]);
          setMultiChoice(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChoice = (e) => {
    const city = e.target.textContent;
    getCoordinates(city, openCageGeocodingAPIKey)
      .then((data) => {
        const coordinates = data.results[0].geometry;
        setData((prevData) => ({
          ...prevData,
          city: city,
          coordinates: coordinates,
        }));
      })
      .then(() => {
        setMultiChoice(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ModalWithForm
      name="register"
      onClose={onCloseModal}
      title="Sign Up"
      onSubmit={handleSubmit}
      buttonText={buttonText}
      addOn=<button
        className="modal__button-text"
        type="text"
        onClick={onLogin}
      >
        {" "}
        or Sign In
      </button>
    >
      <div className="modal__form-inputs">
        <p className="modal__form-radio-header">Select the user type:</p>
        <div className="modal__radio">
          <div>
            <label>
              <input
                type="radio"
                id="shelter"
                value="shelter"
                name="userType"
                className="modal__radio-input"
                onChange={handleChange}
                required
              />
              <span> Shelter</span>
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                id="petParent"
                value="petParent"
                name="userType"
                className="modal__radio-input"
                onChange={handleChange}
                required
              />
              <span> Future pet parent</span>
            </label>
          </div>
        </div>

        <input
          className="modal__form-input"
          type="text"
          minLength={1}
          maxLength={30}
          name="name"
          placeholder="Username"
          value={data.name}
          onChange={handleChange}
        />

        <input
          className="modal__form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <input
          className="modal__form-input"
          type="text"
          id="city"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={handleChange}
          minLength={2}
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

        <input
          className="modal__form-input"
          type="password"
          minLength={8}
          maxLength={30}
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <input
          className="modal__form-input"
          type="password"
          minLength={8}
          maxLength={30}
          name="confirmPassword"
          placeholder="Password again"
          value={data.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {<p className="modal__form-error-text">{error}</p>}
    </ModalWithForm>
  );
};

export default RegisterModal;
