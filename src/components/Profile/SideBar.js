import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({
  handleEditProfileButton,
  handleAddPetButton,
  handleAddNewsButton,
  onLogout,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sideBar">
      <p className="sideBar__name">{currentUser.name}</p>
      {currentUser.userType === "shelter" ? (
        <>
          <button
            onClick={handleAddPetButton}
            type="button"
            className="sidebar__button sidebar__button-top"
          >
            Add a pet
          </button>

          <button
            onClick={handleAddNewsButton}
            type="button"
            className="sidebar__button"
          >
            Add a news article
          </button>
        </>
      ) : (
        <></>
      )}
      <button
        onClick={handleEditProfileButton}
        type="button"
        className="sidebar__button"
      >
        Change profile data
      </button>
      <button onClick={onLogout} type="button" className="sidebar__button">
        Log out
      </button>
    </div>
  );
};
export default SideBar;
