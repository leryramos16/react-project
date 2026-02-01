import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import roomsRoutes from "./routes/rooms.js";
import guestsRoutes from "./routes/guests.js";

dotenv.config();



const app = express();

// middleware
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/rooms", roomsRoutes);
app.use("/api/guests", guestsRoutes);




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

