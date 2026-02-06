import express from "express";
import dotenv from "dotenv";
import pool from "../db.js";

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM rooms ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// available rooms
router.get("/available", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.id, r.name,
      CASE 
        WHEN gr.room_id IS NULL THEN true
        ELSE false
      END AS available
      FROM rooms r
      LEFT JOIN guest_rooms gr ON r.id = gr.room_id
      LEFT JOIN guests g ON g.id = gr.guest_id
        AND CURRENT_DATE >= g.check_in
        AND CURRENT_DATE < g.check_out
      ORDER BY r.name
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

export default router;
