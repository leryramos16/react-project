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
  Divider,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@mui/material";

import NavBar from "../components/NavBar.jsx";
import SearchAppBar from "../components/SearchAppBar.jsx"
import AddIcon from "@mui/icons-material/Add";
import GuestForm from "../components/GuestForm";
import api from "../api/api.js";




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


useEffect(() => {
  const fetchGuests = async () => {
    try {
      const res = await api.get("/guests");
      setGuests(res.data);
    } catch (err) {
      console.error("Failed to fetch guests", err.response?.data || err.message);
    }
  };

  fetchGuests();
}, []);


  // refresh list after save
  const handleSave = async () => {
  try {
    const res = await api.get("/guests");
    setGuests(res.data);
  } catch (err) {
    console.error(err);
  }
};


    return (
        <>
          <Box mb={1}>
            <SearchAppBar/>
          </Box>
           <NavBar/>
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