import "./Profile.css";
import SideBar from "./SideBar";
import PetsSection from "./PetsSection";

const Profile = ({
  cards,
  handleCardClick,
  handleAddPetButton,
  handleAddNewsButton,
  handleEditProfileButton,
  onLogout,
  handleCardLike,
}) => {
  return (
    <section className="profile">
      <SideBar
        handleEditProfileButton={handleEditProfileButton}
        handleAddPetButton={handleAddPetButton}
        handleAddNewsButton={handleAddNewsButton}
        onLogout={onLogout}
      />
      <PetsSection
        cards={cards}
        handleCardClick={handleCardClick}
        handleCardLike={handleCardLike}
      />
    </section>
  );
};
export default Profile;
