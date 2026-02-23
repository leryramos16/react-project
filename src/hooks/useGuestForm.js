import { useState, useEffect } from "react";
import api from "../api/api.js";

export function useGuestForm(open, onSave, onClose) {
  const [fullname, setFullname] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  
  
  // Fetch available rooms from backend


  useEffect(() => {
  if (!open) return;

  const fetchAvailableRooms = async () => {
    try {
      const res = await api.get("/rooms/available");
      setRoomOptions(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err.response?.data || err.message);
    }
  };

  fetchAvailableRooms();
}, [open]);

const resetForm = async () => {
  setFullname("");
  setRooms([]);
  setCheckIn("");
  setCheckOut("");
  setNote("");
  setFormError("");
};

;

  

  // Validate form
  const validate = () => {
    if (!fullname) return "Full name is required";
    if (rooms.length === 0) return "Select at least one room";
    if (!checkIn) return "Check-in date is required";
    if (!checkOut) return "Check-out date is required";
    if (new Date(checkOut) <= new Date(checkIn))
      return "Check-out must be after check-in";
    return null;
  };

  // Handle form submit
  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      setFormError(error);
      return;
    }

    setLoading(true);

    try {
      await api.post("/guests", {
        fullname,
        rooms,
        check_in: checkIn,
        check_out: checkOut,
        note,
      });

      setLoading(false);
      onSave(); // refresh guest list
      onClose(); // close modal
    } catch (err) {
      setLoading(false);
      setFormError(err.response?.data?.error || "Failed to save guest");
    }
  };

  return {
    fullname, setFullname,
    rooms, setRooms,
    roomOptions,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    note, setNote,
    formError, setFormError,
    handleSubmit,
    resetForm,
    loading,
  };
}
