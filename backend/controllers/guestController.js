import * as Guest from "../models/guestModel.js";

// Create guest
export const createGuest = async (req, res) => {
    const { fullname, rooms, check_in, check_out, note } = req.body;

    try {
        const result = await Guest.createGuestwithRooms({
            fullname,
            rooms,
            check_in,
            check_out,
            note,
        });

        if(result.conflict) {
            return res.status(400).json({
                error: "One or more selected rooms are already occupied",
            });
        }

        res.status(201).json({ message: "Guest saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save guest" });
    }
};

// GET all Guests
export const getGuests = async (req, res) => {
    try {
        const guests = await Guest.fetchAllGuests();
        res.json(guests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch guests" });
    }
};