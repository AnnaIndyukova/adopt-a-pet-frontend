import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CityInput from "../CityInput/CityInput";
import { useFormValidation } from "../UseFormValidation/UseFormValidation";

const RegisterModal = ({
  handleRegisterSubmit,
  onLogin,
  onCloseModal,
  buttonText,
}) => {
  const { values, setValues, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  const [errorPasswords, setErrorPasswords] = useState("");

  const handleCityChange = (city) => {
    setValues((values) => ({
      ...values,
      city: city,
    }));
  };

  const handleCoordinatesChange = (coordinates) => {
    setValues((values) => ({
      ...values,
      coordinates: coordinates,
    }));
  };

  useEffect(() => {
    if (values.password !== values.confirmPassword) {
      setErrorPasswords("Passwords do not match");
    } else {
      setErrorPasswords("");
    }
  }, [values.password, values.confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterSubmit(values);
    resetForm();
  };

  return (
    <ModalWithForm
      name="register"
      onClose={onCloseModal}
      title="Sign Up"
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isValid={isValid && !errorPasswords}
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
          title={errors.name}
          value={values.name || ""}
          onChange={handleChange}
          required
        />

        <input
          className="modal__form-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          title={errors.email}
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <CityInput
          onCityChange={handleCityChange}
          onCoordinatesChange={handleCoordinatesChange}
          currentCityValue=""
          required
        />
        <input
          className="modal__form-input"
          type="password"
          minLength={8}
          maxLength={30}
          name="password"
          placeholder="Password"
          title={errors.password}
          value={values.password || ""}
          onChange={handleChange}
          required
        />

        <input
          className="modal__form-input"
          type="password"
          minLength={8}
          maxLength={30}
          name="confirmPassword"
          placeholder="Password again"
          title={errors.confirmPassword}
          value={values.confirmPassword || ""}
          onChange={handleChange}
          required
        />
      </div>
      {<span className="modal__form-error-text">{errorPasswords}</span>}
    </ModalWithForm>
  );
};

export default RegisterModal;
