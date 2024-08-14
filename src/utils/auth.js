import api from "./api";
import { BASE_URL } from "./constants";

// Sign Up
const register = ({ userType, name, email, password, city, coordinates }) => {
  /*  return api.request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userType,
      name,
      email,
      password,
      city,
      coordinates,
    }),
  }); */
};

// Sign In
const login = ({ email, password }) => {
  return api.request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

// Check token
const checkToken = (jwt) => {
  return api.request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
};

// Edit user profile
const updateUser = ({ name, city, coordinates }) => {
  const jwt = localStorage.getItem("jwt");
  return api.request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ name, city, coordinates }),
  });
};

const auth = {
  register,
  login,
  checkToken,
  updateUser,
};

export default auth;
