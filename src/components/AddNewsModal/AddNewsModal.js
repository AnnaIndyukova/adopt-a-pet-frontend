import { useContext, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const AddNewsModal = ({ handleAddNewsSubmit, onCloseModal, buttonText }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${day}.${month}.${year}`;
  const [data, setData] = useState({
    articleDate: formattedDate,
    articleCaption: "",
    articleText: "",
    articleAuthor: currentUser.name,
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
    handleAddNewsSubmit(data);
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Create a news article"
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isValid="true"
    >
      <div className="modal__form-inputs">
        <input
          className="modal__form-input"
          type="text"
          minLength="1"
          name="articleCaption"
          placeholder="Caption"
          value={data.articleCaption}
          onChange={handleChange}
          required
        />

        <textarea
          className="modal__form-input modal__form-textarea"
          id="articleText"
          name="articleText"
          placeholder="Text"
          rows="10"
          cols="50"
          value={data.articleText}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default AddNewsModal;
