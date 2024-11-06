import "./ModalWithForm.css";
import { useEffect } from "react";

const ModalWithForm = ({
  name,
  title,
  children,
  buttonText,
  onSubmit,
  onClose,
  isValid,
  addOn = "",
}) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        />
        <form className="modal__form" onSubmit={onSubmit}>
          <p className="modal__title">{title}</p>
          {children}
          <div className="modal__submit-addOn">
            <button
              className="modal__submit-button"
              type="submit"
              disabled={!isValid}
            >
              {buttonText}
            </button>
            <div className="modal__submit-addOn-text">{addOn}</div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ModalWithForm;
