import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import News from "../News/News";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddPetModal from "../AddPetModal/AddPetModal";
import PetInfoModal from "../PetInfoModal/PetInfoModal";
import EditPetStatusModal from "../EditPetStatusModal/EditPetStatusModal";
import AddNewsModal from "../AddNewsModal/AddNewsModal";
import SearchModal from "../SearchModal/SearchModal";
import Preloader from "../Preloader/Preloader";
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import api from "../../utils/api";
import auth from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [petCards, setPetCards] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    // for future - authorization
    /*    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(console.error);
    } */
  }, []);

  const handleLoginSubmit = ({ email, password }) => {
    const userData = { email, password };
    setIsLoading(true);
    auth
      .login(userData)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          auth.checkToken(res.token).then((data) => {
            setIsLoggedIn(true);
            setCurrentUser(data);
            handleCloseModal();
          });
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterSubmit = ({
    userType,
    name,
    email,
    password,
    city,
    coordinates,
  }) => {
    const userData = { userType, name, email, password, city, coordinates };
    setIsLoading(true);
    auth
      .register(userData)
      .then((res) => {
        handleLoginSubmit({ email, password });
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangeProfileSubmit = ({ name, avatar }) => {
    const userData = { name, avatar };
    setIsLoading(true);
    auth
      .updateUser(userData)
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});
  };

  const handleAddPetSubmit = ({
    petID,
    animalType,
    petAge,
    petDescription,
    petStatus,
    imageUrl,
  }) => {
    const pet = {
      petID,
      animalType,
      petAge,
      petDescription,
      petStatus,
      imageUrl,
    };
    setIsLoading(true);
    api
      .addPet(pet)
      .then((pet) => {
        setPetCards([pet, ...petCards]);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditPetStatusSubmit = () => {};

  const handleAddNewsSubmit = ({
    articleDate,
    articleCaption,
    articleText,
  }) => {
    const article = { articleDate, articleCaption, articleText };
    setIsLoading(true);
    api
      .addNews(article)
      .then((article) => {
        setNewsArticles([article, ...newsArticles]);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFindPetSubmit = () => {};

  const handleCardLike = ({ id, isLiked }) => {
    isLiked
      ? api
          .removeCardLike(id)
          .then((updatedCard) => {
            setPetCards((petCards) => {
              return petCards.map((c) => (c._id === id ? updatedCard : c));
            });
          })
          .catch(console.error)
      : api
          .addCardLike(id)
          .then((updatedCard) => {
            setPetCards((petCards) => {
              return petCards.map((c) => (c._id === id ? updatedCard : c));
            });
          })
          .catch(console.error);
  };

  const handleDeleteCard = () => {
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        const newPetList = petCards.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setPetCards(newPetList);
        handleCloseModal();
      })
      .catch(console.error);
  };

  //  Modal windows
  const handleLogInButton = () => {
    setActiveModal("login");
  };
  const handleSignUpButton = () => {
    setActiveModal("register");
  };
  const handleEditProfileButton = () => {
    setActiveModal("editProfile");
  };
  const handleSearchButton = () => {
    setActiveModal("search");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleEditPetStatus = () => {
    setActiveModal("editPetStatus");
  };
  const handleAddPetButton = () => {
    setActiveModal("create");
  };
  const handleAddNewsButton = () => {
    setActiveModal("createNews");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <div className="app">
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <CurrentUserContext.Provider value={{ currentUser }}>
          <div className="app__container">
            <div className="app__content">
              <Header
                handleSignUpButton={handleSignUpButton}
                handleSearchButton={handleSearchButton}
              />
              <Switch>
                <Route exact path="/">
                  <Main
                    cards={petCards}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                  />
                </Route>
                <Route path="/news">
                  <News articles={newsArticles} />
                </Route>
                <ProtectedRoute path="/profile">
                  <Profile
                    cards={petCards}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    onLogout={handleLogout}
                    handleAddPetButton={handleAddPetButton}
                    handleAddNewsButton={handleAddNewsButton}
                    handleEditProfileButton={handleEditProfileButton}
                  />
                </ProtectedRoute>
              </Switch>
            </div>
            <Footer />
          </div>

          {/* modals */}
          {activeModal === "register" && (
            <RegisterModal
              handleRegisterSubmit={handleRegisterSubmit}
              onLogin={handleLogInButton}
              onCloseModal={handleCloseModal}
              buttonText="Sign Up"
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleLoginSubmit={handleLoginSubmit}
              onCloseModal={handleCloseModal}
              buttonText="Log In"
            />
          )}
          {activeModal === "editProfile" && (
            <EditProfileModal
              handleChangeProfileSubmit={handleChangeProfileSubmit}
              onCloseModal={handleCloseModal}
              buttonText="Save changes"
            />
          )}
          {activeModal === "create" && (
            <AddPetModal
              handleAddPetSubmit={handleAddPetSubmit}
              onCloseModal={handleCloseModal}
              buttonText="Add"
            />
          )}
          {activeModal === "preview" && (
            <PetInfoModal
              onCloseModal={handleCloseModal}
              selectedCard={selectedCard}
              onDeleteCard={handleDeleteCard}
              onEditPetStatus={handleEditPetStatus}
            />
          )}
          {activeModal === "editPetStatus" && (
            <EditPetStatusModal
              onCloseModal={handleCloseModal}
              selectedCard={selectedCard}
              handleEditPetStatusSubmit={handleEditPetStatusSubmit}
            />
          )}
          {activeModal === "search" && (
            <SearchModal
              handleFindPetSubmit={handleFindPetSubmit}
              onCloseModal={handleCloseModal}
              buttonText="Search"
            />
          )}
          {activeModal === "createNews" && (
            <AddNewsModal
              handleAddNewsSubmit={handleAddNewsSubmit}
              onCloseModal={handleCloseModal}
              buttonText="Add"
            />
          )}
          {isLoading && <Preloader />}
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
