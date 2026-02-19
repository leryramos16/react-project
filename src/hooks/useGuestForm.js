import { useEffect, useState } from "react";
import { fetchAvailableRooms } from "../services/roomService";
import { createGuest } from "../services/guestService";


export function useGuestForm(open, onSave, onClose) {
  const [fullname, setFullname] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch rooms when dialog opens
  useEffect(() => {
    if (!open) return;

    const loadRooms = async () => {
      try {
        const data = await fetchAvailableRooms(); // galing sa service/roomService
        setRoomOptions(data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      }
    };

    loadRooms();
  }, [open]);

  const resetForm = () => {
    setFullname("");
    setRooms([]);
    setCheckIn("");
    setCheckOut("");
    setNote("");
  };

  const validate = () => {
    if (!fullname || rooms.length === 0 || !checkIn || !checkOut) {
      return "Please complete all required fields";
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return "Check-out must be after check-in";
    }

    return null;
  };

  const handleSubmit = async () => {
    setFormError(""); // reset error

    const error = validate();
    if (error) {
      setFormError(error); // show error in MUI
      return;
    }

    setLoading(true);

    try {
      await createGuest({
        fullname,
        rooms,
        check_in: checkIn,
        check_out: checkOut,
        note,
      });

      onSave();
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to save guest", err);

      // If backend returns a message (e.g., room occupied)
      if (err.response?.data?.message) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Failed to save guest");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    fullname, setFullname,
    rooms, setRooms,
    roomOptions,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    note, setNote,
    handleSubmit,
    loading,
    formError,
  };
}