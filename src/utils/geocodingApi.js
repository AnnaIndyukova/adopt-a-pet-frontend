import api from "./api";

export const getCoordinates = (city, APIkey) => {
  return api.request(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&language=en&key=${APIkey}`
  );
};
