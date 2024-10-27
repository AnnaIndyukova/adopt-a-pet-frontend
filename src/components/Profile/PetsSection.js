import { useContext } from "react";
import "./Profile.css";
import PetCard from "../PetCard/PetCard";
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const geolib = require("geolib");

const PetsSection = ({ cards, handleCardClick, handleCardLike }) => {
  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);
  let captionText = "";
  let filteredItems = cards;

  if (isLoggedIn && currentUser.userType === "shelter") {
    captionText = "Animals in your shelter";
    filteredItems = cards?.filter((card) => {
      return card.owner === currentUser._id;
    });
  }
  //else - return  cards liked by this user
  if (isLoggedIn && currentUser.userType === "petParent") {
    captionText = "Animals you liked";
    filteredItems = cards?.filter((card) => {
      return card.likes.some((id) => id === currentUser._id);
    });
  }

  const filteredItemsDistance = filteredItems.map((item) => {
    return {
      ...item,
      distance: isLoggedIn
        ? Math.round(
            geolib.getDistance(currentUser.coordinates, item.coordinates) / 1000
          )
        : null,
    };
  });
  filteredItemsDistance.sort((a, b) => a.distance - b.distance);

  return (
    <section className="petsSection__section" id="petsSection-section">
      <div className="petsSection__caption">
        <p className="petsSection__title">{captionText}</p>
      </div>

      <div className="petsSection__items">
        {filteredItemsDistance.map((item) => (
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
