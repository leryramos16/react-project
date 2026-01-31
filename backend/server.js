import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

let guests = [];
let id = 1;

// GET guests
app.get("/api/guests", (req, res) => {
  res.json(guests);
});

// ADD guest
app.post("/api/guests", (req, res) => {
  const guest = { id: id++, ...req.body };
  guests.push(guest);
  res.status(201).json(guest);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

