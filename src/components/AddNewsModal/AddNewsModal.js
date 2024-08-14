import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddNewsModal = ({ handleAddNewsSubmit, onCloseModal, buttonText }) => {
  const [data, setData] = useState({
    articleDate: "",
    articleCaption: "",
    articleText: "",
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
        />
      </div>
    </ModalWithForm>
  );
};

export default AddNewsModal;
