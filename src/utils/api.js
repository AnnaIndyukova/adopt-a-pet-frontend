import { BASE_URL } from "./constants";

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

const getPetsList = () => {};

const addPet = () => {};

const updatePetStatus = () => {};

const addCardLike = (id) => {
  const jwt = localStorage.getItem("jwt");
  return request(`${BASE_URL}/pets/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
};

const removeCardLike = (id) => {
  const jwt = localStorage.getItem("jwt");
  return request(`${BASE_URL}/pets/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
};

const deleteCard = (id) => {};

const addNews = () => {};

const api = {
  request,
  handleResponse,
  addPet,
  addCardLike,
  removeCardLike,
  deleteCard,
  addNews,
  getPetsList,
  updatePetStatus,
};

export default api;
