import "./PetInfoModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const PetInfoModal = ({
  selectedCard,
  onCloseModal,
  onDeleteCard,
  handleEditPetStatus,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  const petDeleteButtonClassName = `modal__pet_delete-button ${
    isOwn
      ? "modal__pet_delete-button_visible"
      : "modal__pet_delete-button_hidden"
  }`;
  return (
    <div className={"modal"}>
      <div className="modal__content-pet">
        <button
          className="modal__close-button-pet"
          type="button"
          onClick={onCloseModal}
        ></button>
        <img
          className="modal__pet-image"
          src={selectedCard.imageUrl}
          alt={selectedCard.petID}
        />
        <div className="modal__pet-info">
          {selectedCard.petID}
          <div className="modal__pet-info-del-button">
            <button
              className={petDeleteButtonClassName}
              type="text"
              onClick={handleEditPetStatus}
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
          <p className="modal__pet-age">Age: {selectedCard.petAge}</p>
          {selectedCard.petDescription}
          {selectedCard.owner}
        </div>
      </div>
    </div>
  );
};

export default PetInfoModal;
