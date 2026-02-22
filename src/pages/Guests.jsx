import { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Container,
  Button,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import NavBar from "../components/NavBar.jsx";
import SearchAppBar from "../components/SearchAppBar.jsx";
import GuestForm from "../components/GuestForm.jsx";
import GuestCard from "../components/GuestCard.jsx";
import api from "../api/api.js";

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch guests from backend
  const fetchGuests = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/guests");
      setGuests(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch guests",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load guests on mount
  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  // Refresh after saving guest
  const handleSave = async () => {
    await fetchGuests();
  };

  return (
    <>
      <Box mb={1}>
        <SearchAppBar />
      </Box>

      <NavBar />

      <Container>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5">Guest List</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Guest
          </Button>
        </Stack>

        {/* Loading State */}
        {loading ? (
          <Stack alignItems="center" mt={4}>
            <CircularProgress />
          </Stack>
        ) : (
          <Stack spacing={2}>
            {guests.length > 0 ? (
              guests.map((guest) => (
                <GuestCard key={guest.id} guest={guest} />
              ))
            ) : (
              <Typography>No guests found.</Typography>
            )}
          </Stack>
        )}
      </Container>

      {/* Guest Form Modal */}
      <GuestForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}