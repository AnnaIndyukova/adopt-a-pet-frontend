import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CityInput from "../CityInput/CityInput";

const EditProfileModal = ({
  handleChangeProfileSubmit,
  onCloseModal,
  buttonText,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: `${currentUser.name}`,
    city: `${currentUser.city}`,
    coordinates: `${currentUser.coordinates}`,
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
    handleChangeProfileSubmit(data);
  };

  const handleCityChange = (city) => {
    setData((prevData) => ({
      ...prevData,
      city: city,
    }));
  };

  const handleCoordinatesChange = (coordinates) => {
    setData((prevData) => ({
      ...prevData,
      coordinates: coordinates,
    }));
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Change profile data"
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <div className="modal__form-inputs">
        <input
          className="modal__form-input"
          type="text"
          minLength={1}
          maxLength={30}
          name="name"
          placeholder="Username"
          value={data.name}
          onChange={handleChange}
        />
        <CityInput
          onCityChange={handleCityChange}
          onCoordinatesChange={handleCoordinatesChange}
          currentCityValue={data.city}
        />
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
