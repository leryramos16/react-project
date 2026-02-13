import api from "../api/api.js";

export const createGuest = async (guestData) => {
  return api.post("/guests", guestData);
};
