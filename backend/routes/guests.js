import express from "express";
import pool from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { fullname, rooms, check_in, check_out, note } = req.body;

  try {
    //  insert guest
    const guestResult = await pool.query(
      `INSERT INTO guests (fullname, check_in, check_out, note)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [fullname, check_in, check_out, note]
    );

    const guestId = guestResult.rows[0].id;

    //  insert selected rooms
    for (let roomId of rooms) {
      await pool.query(
        `INSERT INTO guest_rooms (guest_id, room_id)
         VALUES ($1, $2)`,
        [guestId, roomId]
      );
    }

    res.status(201).json({ message: "Guest saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save guest" });
  }
});

// get guests API
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        g.id,
        g.fullname,
        g.check_in,
        g.check_out,
        g.note,
        COALESCE(ARRAY_AGG(r.name) FILTER (WHERE r.name IS NOT NULL), '{}') AS rooms
      FROM guests g
      LEFT JOIN guest_rooms gr ON g.id = gr.guest_id
      LEFT JOIN rooms r ON gr.room_id = r.id
      GROUP BY g.id
      ORDER BY g.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
});



export default router;