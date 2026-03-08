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
  Alert,
} from "@mui/material";
import { useGuestForm } from "../hooks/useGuestForm";

function GuestForm({ open, onClose, onSave }) {
  const {
    fullname, setFullname,
    rooms, setRooms,
    roomOptions,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    note, setNote,
    formError, setFormError,
    handleSubmit,
    loading,
  } = useGuestForm(open, onSave, onClose);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Guest</DialogTitle>

      <DialogContent>
        {formError && (
          <Alert variant="filled" severity="error">
            {formError}
          </Alert>
        )}

        <Stack spacing={2} mt={1}>
          <TextField
            label="Full Name"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
              if (formError) setFormError("");
            }}
            fullWidth
            autoComplete="off"
          />

          <FormControl fullWidth>
            <InputLabel>Rooms</InputLabel>
            <Select
              multiple
              value={rooms}
              onChange={(e) => {
              setRooms(e.target.value);
              if (formError) setFormError("");
            }}
              input={<OutlinedInput label="Rooms" />}
              renderValue={(selected) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {selected.map((roomId) => {
                    const room = roomOptions.find(r => r.id === roomId);
                    return <Chip key={roomId} label={room?.name} />;
                  })}
                </Stack>
              )}
            >
              {roomOptions.map((room) => (
                <MenuItem
                  key={room.id}
                  value={room.id}
                  disabled={!room.available}
                >
                  {room.name}
                  {!room.available && " (Occupied)"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Check-in Date"
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (formError) setFormError("");
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Check-out Date"
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              if (formError) setFormError("");
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Notes"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              if (formError) setFormError("");
            }}
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GuestForm;
