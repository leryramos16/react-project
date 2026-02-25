import { Container, Typography, Stack, Paper } from "@mui/material";
import NavBar from "../components/NavBar";

export default function Meals() {
  return (
    <>
      <Container sx={{ mt: 3, mb: 10 }}>
        <Typography variant="h5" gutterBottom>
          Fullboard for Today
        </Typography>

        <Stack spacing={2}>
          <Paper sx={{ p: 2 }}>
            Breakfast List Here
          </Paper>

          <Paper sx={{ p: 2 }}>
            Lunch List Here
          </Paper>

          <Paper sx={{ p: 2 }}>
            Dinner List Here
          </Paper>
        </Stack>
      </Container>

      <NavBar />
    </>
  );
}