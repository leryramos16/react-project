import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GuestForm from "../components/GuestForm";
import axios from "axios";


function Guests() {
    const [guests, setGuests] = useState([]);
    const [open, setOpen] = useState(false);

    // fetch guests in backend
    useEffect(() => {
      fetch("https://localhost/api/guests")
        .then((res) => res.json())
        .then((data) => setGuests(data));
    }, []);

    const fetchGuests = async () => {
        const res = await axios.get("http://localhost:5000/api/guests");
        setGuests(res.data);
    };

    const addGuest = async (guest) => {
        await axios.post("http://localhost:5000/api/guests", guest);
        fetchGuests();
        setOpen(false);
    };

    return (
        <>
           <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Guest Dashboard</Typography>
                </Toolbar>
           </AppBar>

           <Container>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Typography variant="h5">Guest List</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        onClick={() => setOpen(true)}
                    >
                        Add Guest
                    </Button>
                </Stack>

                <Card>
                    <CardContent>
                        {guests.length === 0 && <Typography>No guests yet</Typography>}

                        {guests.map((g) => (
                            <Typography key={g.id}>
                                {g.name} - {g.room}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
           </Container>

           <GuestForm open={open} onClose={() => setOpen(false)} onSave={addGuest}/>
        </>
    );
    
}

export default Guests;