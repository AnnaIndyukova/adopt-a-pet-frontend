import { useState, useContext } from "react";
import "./Header.css";
import logoSrc from "../../images/logo.svg";
import burger from "../../images/burger.svg";
import closeButton from "../../images/closeButtonGray.svg";
import { AppContext } from "../../contexts/AppContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const Header = ({ handleSignUpButton, handleSearchButton }) => {
  const { isLoggedIn } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const mobileMenuHandler = () => {
    toggleMobileMenu();
  };

  const SearchButtonHandler = () => {
    toggleMobileMenu();
    handleSearchButton();
  };

  const SignUpButtonHandler = () => {
    if (isMobileMenuOpened) {
      toggleMobileMenu();
    }
    handleSignUpButton();
  };

  return (
    <header
      className={`header ${isMobileMenuOpened ? "header__mobile-opened" : ""}`}
    >
      <div className="header__logo">
        <Link to="/">
          <img src={logoSrc} alt="logo" />
        </Link>
      </div>

      <div
        className={`header__menu ${
          isMobileMenuOpened
            ? "header__menu_mobile-opened"
            : "header__menu_mobile-closed"
        }`}
      >
        <button
          className="header__button"
          type="text"
          onClick={SearchButtonHandler}
        >
          Find a Friend
        </button>

        <Link to="/news" style={{ textDecoration: "none" }}>
          <p className="header__tab" onClick={toggleMobileMenu}>
            News
          </p>
        </Link>

        {isLoggedIn ? (
          <div className="header__user">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <p className="header__tab">My Profile</p>
              <p className="header__user-avatar">
                {currentUser.name[0].toUpperCase()}
              </p>
            </Link>
          </div>
        ) : (
          <button
            className="header__button_border"
            type="text"
            onClick={SignUpButtonHandler}
          >
            Sign Up
          </button>
        )}

        <div
          onClick={mobileMenuHandler}
          className={`header__menu-mobile-icon ${
            isMobileMenuOpened ? "" : "header__burger-show"
          }`}
        >
          <img src={burger} alt="menu" />
        </div>

        <div
          onClick={mobileMenuHandler}
          className={`header__menu-mobile-icon ${
            isMobileMenuOpened ? "header__close-button-show" : ""
          }`}
        >
          <img src={closeButton} alt="menu" />
        </div>
      </div>
    </header>
  );
};
export default Header;
