import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import roomRoutes from "./routes/roomRoutes.js";
import guestsRoutes from "./routes/guestRoutes.js";

dotenv.config();



const app = express();

// middleware
app.use(cors());
app.use(express.json());


// ROUTE (CONTROLLER ENTRY POINT)
app.use("/api/rooms", roomRoutes);
app.use("/api/guests", guestsRoutes);




app.listen(5000, () => {
  console.log("Server running on port 5000");
});

