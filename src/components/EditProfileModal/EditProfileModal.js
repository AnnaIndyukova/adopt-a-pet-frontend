import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  handleChangeProfileSubmit,
  onCloseModal,
  buttonText,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: `${currentUser.name}`,
    city: `${currentUser.city}`,
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

        <input
          className="modal__form-input"
          type="text"
          id="city"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={handleChange}
          minLength={2}
        />
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
