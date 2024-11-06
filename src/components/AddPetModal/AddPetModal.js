import { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const AddPetModal = ({ handleAddPetSubmit, onCloseModal, buttonText }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    petNameID: "",
    animalType: "dog",
    petAge: "junior",
    petDescription: "",
    petStatus: "available",
    imageUrl: "",
    ownerID: currentUser._id,
    shelter: currentUser.name,
    city: currentUser.city,
    coordinates: currentUser.coordinates,
    shelterEmail: currentUser.email,
    likes: [],
  });

  useEffect(() => {
    const image = new Image();
    image.src = data.imageUrl;
    image.onload = () => setError("");
    image.onerror = () => setError("Enter a valid image URL");
  }, [data.imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      handleAddPetSubmit(data);
    }
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="New pet: fill the information"
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isValid="true"
    >
      <div className="modal__form-inputs">
        <input
          className="modal__form-input"
          type="text"
          minLength="1"
          maxLength="30"
          name="petNameID"
          placeholder="Pet ID"
          value={data.petNameID}
          onChange={handleChange}
          required
        />

        <select
          className="modal__form-input"
          id="animalType"
          name="animalType"
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
      {<p className="modal__form-error-text">{error}</p>}
    </ModalWithForm>
  );
};

export default AddPetModal;
