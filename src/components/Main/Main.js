import PetCard from "../PetCard/PetCard";
import "./Main.css";

function Main({ handleCardClick, handleCardLike, cards }) {
  return (
    <main className="main">
      <div className="main__greeting">
        <p className="main__greeting-p">
          You can adopt one of them! Sign up to discover all the possibilities.
        </p>
        <p className="main__greeting-p">
          If you work at a shelter, sign up to share information about your
          animals.
        </p>
      </div>
      <section className="card__section" id="card-section">
        <div className="card__items">
          {cards.map((item) => (
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
