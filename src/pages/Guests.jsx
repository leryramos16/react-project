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
  Chip,
  Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GuestForm from "../components/GuestForm";




function Guests() {
    const [guests, setGuests] = useState([]);
    const [open, setOpen] = useState(false);
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        };


    // fetch guests in backend
    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/guests");
                const data = await res.json();
                setGuests(data);
            } catch (err) {
                console.error("Failed to fetch guests", err);
            }
        };

        fetchGuests();
    }, []);

   const handleSave = async () => {
    const res = await fetch("http://localhost:5000/api/guests");
    const data = await res.json();
    setGuests(data);
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

                <Stack spacing={2}>
                    {guests.map((guest) => (
                        <Card key={guest.id} variant="outlined">
                        <CardContent>
                            {/* Guest Name */}
                            <Typography variant="h6">
                            {guest.fullname}
                            </Typography>

                            {/* Dates */}
                            <Typography color="text.secondary">
                            {formatDate(guest.check_in)} → {formatDate(guest.check_out)}
                            </Typography>

                            {/* Rooms */}
                            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                            {guest.rooms.map((room, index) => (
                                <Chip key={index} label={room} />
                            ))}
                            </Stack>

                            {/* Notes */}
                            {guest.note && (
                            <>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body2">
                                Note: {guest.note}
                                </Typography>
                            </>
                            )}
                        </CardContent>
                        </Card>
                    ))}
                    </Stack>

           </Container>

           <GuestForm open={open} onClose={() => setOpen(false)} onSave={handleSave}/>
        </>
    );
    
}

export default Guests;