// ITO ANG MAIN ENTRY PAPUNTA SA CONTROLLER

import express from "express";
import { createGuest, getGuests } from "../controllers/guestController.js";

const router = express.Router();

router.post("/", createGuest);
router.get("/", getGuests);

export default router;