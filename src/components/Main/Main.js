import { useContext } from "react";
import PetCard from "../PetCard/PetCard";
import "./Main.css";
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const geolib = require("geolib");

function Main({ handleCardClick, handleCardLike, cards }) {
  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);

  const filteredItems = cards?.filter((card) => {
    return card.petStatus === "available";
  });

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
    <main className="main">
      <div className="main__greeting">
        <p className="main__greeting-p">
          You can adopt one of them! Sign up to find pets available near you.
        </p>
        <p className="main__greeting-p">
          If you work at a shelter, sign up to share information about your
          animals.
        </p>
      </div>
      <section className="main__cards-section" id="card-section">
        <div className="main__cards-items">
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
    </main>
  );
}

export default Main;
