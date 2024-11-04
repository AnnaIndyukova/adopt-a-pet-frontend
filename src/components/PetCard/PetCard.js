import { useState, useContext } from "react";
import "./PetCard.css";
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const PetCard = ({ item, handleCardClick, handleCardLike }) => {
  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(
    currentUser && item.likes.some((id) => id === currentUser._id)
  );

  const cardLikeButtonClass = `card__like-button ${
    !isLoggedIn
      ? "card__like-button_hidden"
      : isLiked
      ? "card__like-button_liked"
      : "card__like-button_not-liked"
  }`;

  const cardIconNotAvailableClass = `card__icon-not-available ${
    item.petStatus === "available" ? "card__icon-not-available_hidden" : ""
  }`;

  const handleLike = () => {
    handleCardLike({
      id: item._id,
      isLiked: isLiked,
      setIsLiked: setIsLiked,
    });
  };

  return (
    <div className="card">
      {isLoggedIn ? (
        <button
          type="button"
          className={cardLikeButtonClass}
          onClick={() => {
            handleLike();
          }}
        ></button>
      ) : (
        <button type="button" className="card__like-button_hidden"></button>
      )}

      <img
        src={item.imageUrl}
        className="card__image"
        alt={item.name}
        onClick={() => handleCardClick(item)}
      />
      <div className="card__city-wrapper">
        <p className="card__city">
          {" "}
          {item.city.split(",")[0]}
          {item.distance ? ` (${item.distance} km)` : ""}
        </p>
      </div>
      <div className={cardIconNotAvailableClass} title="Not available">
        N
      </div>
    </div>
  );
};

export default PetCard;
