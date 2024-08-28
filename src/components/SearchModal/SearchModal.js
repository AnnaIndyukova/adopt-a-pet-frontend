import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SearchModal = ({
  handleFindPetSubmit,
  onCloseModal,
  buttonText,
  handleClearSearch,
}) => {
  const [data, setData] = useState({
    animalType: "Dog",
    petAge: "",
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
    handleFindPetSubmit(data);
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Find a Friend"
      onSubmit={handleSubmit}
      buttonText={buttonText}
      addOn=<button
        className="modal__button-text"
        type="text"
        onClick={handleClearSearch}
      >
        {" "}
        Clear search
      </button>
    >
      <div className="modal__form-inputs">
        <select
          className="modal__form-input"
          id="animalType"
          name="animalType"
          onChange={handleChange}
          placeholder="Type of animal"
          value={data.animalType}
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Other">Other</option>
        </select>

        <select
          className="modal__form-input"
          id="petAge"
          name="petAge"
          onChange={handleChange}
          placeholder="Age of the pet"
          value={data.petAge}
        >
          <option value="">Age doesn't matter</option>
          <option value="Junior">Junior</option>
          <option value="Adult">Adult</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
    </ModalWithForm>
  );
};

export default SearchModal;
