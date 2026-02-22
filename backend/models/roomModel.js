import pool from "../db.js";

// FETCH ALL ROOMS
export const fetchAllRooms = async () => {
  const result = await pool.query(
    "SELECT id, name FROM rooms ORDER BY id"
  );
  return result.rows;
};

// FETCH AVAILABLE ROOMS
export const fetchAvailableRooms = async () => {
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
  return result.rows;
};
