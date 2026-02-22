import express from "express";
import { getRooms, getAvailableRooms } from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/available", getAvailableRooms);

export default router;