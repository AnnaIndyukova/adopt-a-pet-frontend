import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditPetStatusModal = ({
  selectedCard,
  handleEditPetStatusSubmit,
  onCloseModal,
  buttonText,
}) => {
  const [data, setData] = useState({
    petStatus: `${selectedCard.petStatus}`,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditPetStatusSubmit(data);
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Change the pet's status"
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <img
        className="modal__pet-image"
        src={selectedCard.imageUrl}
        alt={selectedCard.petID}
      />
      <div className="modal__form-inputs">
        <select
          className="modal__form-input"
          id="petStatus"
          name="petStatus"
          onChange={handleChange}
          placeholder="Pet status"
          value={data.petStatus}
        >
          <option value="available">Available</option>
          <option value="notAvailable">Have found home</option>
        </select>
      </div>
    </ModalWithForm>
  );
};

export default EditPetStatusModal;
