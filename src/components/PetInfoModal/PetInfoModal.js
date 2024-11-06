import "./PetInfoModal.css";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";

const PetInfoModal = ({
  selectedCard,
  onCloseModal,
  onDeleteCard,
  onEditPetStatus,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AppContext);
  const isOwn = isLoggedIn && selectedCard.owner === currentUser._id;

  const petDeleteButtonClassName = `modal__pet_delete-button ${
    isOwn
      ? "modal__pet_delete-button_visible"
      : "modal__pet_delete-button_hidden"
  }`;
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onCloseModal]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };
  return (
    <div className={"modal"} onClick={handleOverlay}>
      <div className="modal__content-pet">
        <button
          className="modal__close-button-pet"
          type="button"
          onClick={onCloseModal}
        ></button>

        <img
          className="modal__pet-image"
          src={selectedCard.imageUrl}
          alt={selectedCard.petNameID}
        />
        <div className="modal__city_wrapper">
          <p className="modal__city"> {selectedCard.city.split(",")[0]}</p>
        </div>
        <div className="modal__pet-info-wrapper">
          <div className="modal__pet-info">
            <p>Pet ID: {selectedCard.petNameID}</p>
            <p> Age: {selectedCard.petAge}</p>
            <p> {selectedCard.petDescription}</p>
            <p title={selectedCard.shelterEmail}>
              {" "}
              Shelter: {selectedCard.shelter}
            </p>
          </div>

          {isOwn && (
            <div className="modal__pet-info-buttons">
              <button
                className={petDeleteButtonClassName}
                type="text"
                onClick={onEditPetStatus}
              >
                Edit pet status
              </button>
              <button
                className={petDeleteButtonClassName}
                type="text"
                onClick={onDeleteCard}
              >
                Delete this card
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetInfoModal;
