import { useState, useContext } from "react";
import "./Header.css";
import logoSrc from "../../images/logo.svg";
import burger from "../../images/burger.svg";
import closeButton from "../../images/closeButtonGray.svg";
import { AppContext } from "../../contexts/AppContext";
import { Link } from "react-router-dom";

const Header = ({ handleSignUpButton, handleSearchButton, getPetsList }) => {
  const { isLoggedIn } = useContext(AppContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const closeMobileMenu = () => {
    if (isMobileMenuOpened) {
      toggleMobileMenu();
    }
  };

  const onClickTab = () => {
    getPetsList();
    closeMobileMenu();
  };

  const mobileMenuHandler = () => {
    toggleMobileMenu();
  };

  const SearchButtonHandler = () => {
    closeMobileMenu();
    handleSearchButton();
  };

  const SignUpButtonHandler = () => {
    closeMobileMenu();
    handleSignUpButton();
  };

  return (
    <header
      className={`header ${isMobileMenuOpened ? "header__mobile-opened" : ""}`}
    >
      <div className="header__logo">
        <Link className="header__link" to="/">
          <img className="header__image" src={logoSrc} alt="logo" />
        </Link>
      </div>

      <div
        className={`header__menu ${
          isMobileMenuOpened
            ? "header__menu_mobile-opened"
            : "header__menu_mobile-closed"
        }`}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            className="header__button"
            type="text"
            onClick={SearchButtonHandler}
          >
            Find a Friend
          </button>
        </Link>

        <Link
          to="/news"
          className="header__link"
          style={{ textDecoration: "none" }}
        >
          <p className="header__tab" onClick={onClickTab}>
            News
          </p>
        </Link>

        {isLoggedIn ? (
          <Link
            to="/profile"
            className="header__link"
            style={{ textDecoration: "none" }}
          >
            <p className="header__tab" onClick={onClickTab}>
              My profile
            </p>
          </Link>
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
