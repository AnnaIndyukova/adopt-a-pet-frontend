import { useContext, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const AddPetModal = ({ handleAddPetSubmit, onCloseModal, buttonText }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [data, setData] = useState({
    petID: "",
    animalType: "",
    petAge: "",
    petDescription: "",
    petStatus: "available",
    imageUrl: "",
    // ownerID: currentUser._id,
    ownerID: "1", //temporary
    shelter: currentUser.name,
    city: currentUser.city,
    coordinates: JSON.stringify(currentUser.coordinates), //temporary
    shelterEmail: currentUser.email,
    likes: [],
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
    handleAddPetSubmit(data);
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="New pet: fill the information"
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <div className="modal__form-inputs">
        <input
          className="modal__form-input"
          type="text"
          minLength="1"
          maxLength="30"
          name="petID"
          placeholder="Pet ID"
          value={data.petID}
          onChange={handleChange}
          required
        />

        <select
          className="modal__form-input"
          id="animal-type"
          name="animal-type"
          onChange={handleChange}
          placeholder="Type of animal"
          value={data.animalType}
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="other">Other</option>
        </select>

        <select
          className="modal__form-input"
          id="petAge"
          name="petAge"
          onChange={handleChange}
          placeholder="Age of the pet"
          value={data.petAge}
        >
          <option value="junior">Junior</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>

        <input
          className="modal__form-input"
          type="text"
          minLength="1"
          name="petDescription"
          placeholder="Pet description"
          value={data.petDescription}
          onChange={handleChange}
        />

        <input
          className="modal__form-input"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={data.imageUrl}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default AddPetModal;
