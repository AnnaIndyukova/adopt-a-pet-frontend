import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterCompleteModal = ({ onCloseModal, handleSwitchToLogin }) => {
  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Registration completed"
      onSubmit={handleSwitchToLogin}
      buttonText={"Log In"}
      isValid="true"
    ></ModalWithForm>
  );
};

export default RegisterCompleteModal;
