import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ handleLoginSubmit, onCloseModal, buttonText }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit({ email, password });
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Log in"
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <div className="modal__form-inputs">
        <input
          className="modal__form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          className="modal__form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
