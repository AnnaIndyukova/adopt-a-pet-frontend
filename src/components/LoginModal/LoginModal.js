import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormValidation } from "../UseFormValidation/UseFormValidation";

const LoginModal = ({ handleLoginSubmit, onCloseModal, buttonText }) => {
  const { formError } = useContext(AppContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit({ email: values.email, password: values.password });
    resetForm();
  };

  return (
    <ModalWithForm
      title="Log in"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isValid={isValid}
    >
      <div className="modal__form-inputs">
        <input
          className="modal__form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__form-error-text">{errors.email}</span>
        <input
          className="modal__form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          minLength={8}
          maxLength={30}
          required
        />
        <span className="modal__form-error-text">{errors.password}</span>
        {formError && (
          <span className="modal__form-error-text">{formError}</span>
        )}
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
