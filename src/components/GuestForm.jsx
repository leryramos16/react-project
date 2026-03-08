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
  Autocomplete,
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

          <Autocomplete
            multiple
            options={roomOptions}
            getOptionLabel={(option) => option.name}
            value={roomOptions.filter(room => rooms.includes(room.id))}
            onChange={(event, newValue) => {
              setRooms(newValue.map(room => room.id));
              if (formError) setFormError("");
            }}
            getOptionDisabled={(option) => !option.available}

            renderOption={(props, option) => (
              <li {...props}>
                {option.name}
                {!option.available && " (Occupied)"}
              </li>
            )}

            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Rooms"
                placeholder="Select rooms"
              />
            )}
          />

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
