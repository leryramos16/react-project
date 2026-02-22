import * as Room from "../models/roomModel.js";

// Get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.fetchAllRooms();
        res.json(rooms);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
};

// Get available rooms
export const getAvailableRooms = async (req, res) => {
    try {
        const rooms = await Room.fetchAvailableRooms();
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error:"Failed to fetch availabel rooms"});
    }
};