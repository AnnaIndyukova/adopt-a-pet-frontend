import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CityInput from "../CityInput/CityInput";

const RegisterModal = ({
  handleRegisterSubmit,
  onLogin,
  onCloseModal,
  buttonText,
}) => {
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

  const handleCityChange = (city) => {
    setData((prevData) => ({
      ...prevData,
      city: city,
    }));
  };

  const handleCoordinatesChange = (coordinates) => {
    setData((prevData) => ({
      ...prevData,
      coordinates: coordinates,
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
      handleRegisterSubmit(data);
    }
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
          id="name"
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
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <CityInput
          onCityChange={handleCityChange}
          onCoordinatesChange={handleCoordinatesChange}
          currentCityValue=""
        />
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
