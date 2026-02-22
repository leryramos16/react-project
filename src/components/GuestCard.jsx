import { Card, CardContent, Typography, Stack, Chip, Divider } from "@mui/material";

export default function GuestCard({ guest }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Card variant="outlined">
      <CardContent>
        {/* Guest Name */}
        <Typography variant="h6">{guest.fullname}</Typography>

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
            <Typography variant="body2">Note: {guest.note}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
