import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

function GuestForm({ open, onClose, onSave}) {
    const [fullname, setFullname] = useState("");
    

    const handleSubmit = () => {
        onSave({ fullname });
        setFullname("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Guest</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>  
                    <TextField
                        label="Full Name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </Stack>  
            </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained">Save</Button>
                </DialogActions>
        </Dialog>
    );
}

export default GuestForm;