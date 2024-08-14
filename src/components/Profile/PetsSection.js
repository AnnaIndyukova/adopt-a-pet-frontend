import { useContext } from "react";
import "./PetsSection.css";
import PetCard from "../PetCard/PetCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const PetsSection = ({ cards, handleCardClick, handleCardLike }) => {
  const { currentUser } = useContext(CurrentUserContext);
  let captionText = "";
  let filteredItems = cards;

  if (currentUser && currentUser.type === "shelter") {
    captionText = "Animals in your shelter";
    filteredItems = cards?.filter((card) => {
      return card.owner === currentUser._id;
    });
  }
  //else - return  cards liked by this user
  if (currentUser && currentUser.type === "petParent") {
    captionText = "Animals you liked";
    filteredItems = cards?.filter((card) => {
      return card.likes.some((id) => id === currentUser._id);
    });
  }

  return (
    <section className="petsSection__section" id="petsSection-section">
      <div className="petsSection__caption">
        <p className="petsSection__title">{captionText}</p>
      </div>

      <div className="petsSection__items">
        {filteredItems.map((item) => (
          <PetCard
            item={item}
            handleCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            key={item._id}
          />
        ))}
      </div>
    </section>
  );
};
export default PetsSection;
