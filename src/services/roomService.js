import api from "../api/api.js";

export const fetchAvailableRooms = async () => {
  const res = await api.get("/rooms/available");
  return res.data;
};
