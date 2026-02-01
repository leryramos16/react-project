import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {id: 1, name: "Room 101"},
    {id: 2, name: "Room 102"},
    {id: 3, name: "Room 103"},
    {id: 4, name: "Room 105"},
    {id: 5, name: "Room 106"},
    {id: 6, name: "Room 107"},
  ]);
});



export default router;
