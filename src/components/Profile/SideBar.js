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
      <div className="sideBar__avatar-name">
        <p className="sideBar__user-avatar">
          {currentUser.name[0].toUpperCase()}
        </p>
        <h3 className="sideBar__name">{currentUser.name}</h3>
      </div>
      if (currentUser.userType === "shelter")
      {
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
            className="sidebar__button sidebar__button-other"
          >
            Add a news article
          </button>
        </>
      }
      <button
        onClick={handleEditProfileButton}
        type="button"
        className="sidebar__button sidebar__button-other"
      >
        Change profile data
      </button>
      <button
        onClick={onLogout}
        type="button"
        className="sidebar__button sidebar__button-other"
      >
        Log out
      </button>
    </div>
  );
};
export default SideBar;
