import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";

function GuestForm({ open, onClose, onSave }) {
  const [fullname, setFullname] = useState("");
  const [rooms, setRooms] = useState([]);          // selected rooms
  const [roomOptions, setRoomOptions] = useState([]); // from backend
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [note, setNote] = useState("");

  //  fetch rooms from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRoomOptions(data));
  }, []);

  const handleSubmit = async () => {
    if (!fullname || rooms.length === 0 || !checkIn || !checkOut) {
        alert("Please complete all required fields");
        return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
    alert("Check-out must be after check-in");
    return;
  }

    const guestData = {
      fullname,
      rooms,
      check_in: checkIn,
      check_out: checkOut,
    };

    // 🔹 send to backend
    await fetch("http://localhost:5000/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guestData),
    });

    onSave(guestData); // optional (for local state)
    setFullname("");
    setRooms([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Guest</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* Full name */}
          <TextField
            label="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            fullWidth
          />

          {/* Room multi-select */}
          <FormControl fullWidth>
            <InputLabel>Rooms</InputLabel>
            <Select
              multiple
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              input={<OutlinedInput label="Rooms" />}
              renderValue={(selected) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {selected.map((room) => (
                    <Chip key={room} label={room} />
                  ))}
                </Stack>
              )}
            >
              {roomOptions.map((room) => (
                <MenuItem key={room.id} value={room.name}>
                  {room.name}
                </MenuItem>
              ))}
            </Select>             
          </FormControl>

          {/* Check-in date */}
            <TextField
            label="Check-in Date"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            fullWidth
            />

            {/* Check-out date */}
            <TextField
            label="Check-out Date"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            />

            {/* Notes */}
            <TextField
            label="Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
            rows={3}
            fullWidth
            />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}
                disabled={!fullname || rooms.length === 0}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GuestForm;
