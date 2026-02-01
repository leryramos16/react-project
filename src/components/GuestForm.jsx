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

  // 🔹 fetch rooms from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRoomOptions(data));
  }, []);

  const handleSubmit = async () => {
    const guestData = {
      fullname,
      rooms,
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
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GuestForm;
