import { BASE_URL } from "./constants";

const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

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

const api = {
  request,
  handleResponse,
  //addPet,
  //addNews,
  //deleteCard,
  //getPetsList,
  addCardLike,
  removeCardLike,
};

export default api;
