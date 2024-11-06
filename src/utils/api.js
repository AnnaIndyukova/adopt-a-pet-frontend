import { BASE_URL } from "./constants";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject({ status: res.status, message: err.message });
  });
};

const request = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

const getPetsList = () => {
  return request(`${BASE_URL}/pets`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addPet = ({
  petNameID,
  animalType,
  petAge,
  petDescription,
  petStatus,
  imageUrl,
  shelter,
  city,
  coordinates,
  shelterEmail,
}) => {
  const jwt = localStorage.getItem("jwt");
  return request(`${BASE_URL}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      petNameID,
      animalType,
      petAge,
      petDescription,
      petStatus,
      imageUrl,
      shelter,
      city,
      coordinates,
      shelterEmail,
    }),
  });
};

const updatePetStatus = ({ id, petStatus }) => {
  const jwt = localStorage.getItem("jwt");
  return api.request(`${BASE_URL}/pets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ petStatus }),
  });
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

const deleteCard = (_id) => {
  const jwt = localStorage.getItem("jwt");
  return request(`${BASE_URL}/pets/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
};

const addNews = ({
  articleDate,
  articleCaption,
  articleText,
  articleAuthor,
}) => {
  const jwt = localStorage.getItem("jwt");
  return request(`${BASE_URL}/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      articleDate,
      articleCaption,
      articleText,
      articleAuthor,
    }),
  });
};

const getNewsList = () => {
  return request(`${BASE_URL}/news`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const api = {
  request,
  handleResponse,
  addPet,
  addCardLike,
  removeCardLike,
  deleteCard,
  addNews,
  getNewsList,
  getPetsList,
  updatePetStatus,
};

export default api;
