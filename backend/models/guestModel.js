import pool from "../db.js";

// alisin pag lampas na sa check in date
export const autoCheckoutGuests = async () => {
    await pool.query(`
        DELETE FROM guest_rooms
        WHERE guest_id IN (
            SELECT id
            FROM guests
            WHERE check_out < CURRENT_DATE
            )
            `);
}


// Fetch all guests
export const fetchAllGuests = async () => {

    // auto remove pag lampas na ang checkin date
    await autoCheckoutGuests();

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
        WHERE g.check_out >= CURRENT_DATE
        GROUP BY g.id
        ORDER BY g.created_at DESC
        `);

        return result.rows;    
};

// Create Guest with Rooms
export const createGuestwithRooms = async ({
    fullname,
    rooms,
    check_in,
    check_out,
    note,
}) => {

    // Check room CONFLICT
    const conflict = await pool.query(`
        SELECT 1
        FROM guest_rooms gr
        JOIN guests g ON g.id = gr.guest_id
        WHERE gr.room_id = ANY($1::int[])
            AND $2 < g.check_out
            AND $3 > g.check_in
        `,
        [rooms, check_in, check_out]
    );

    if (conflict.rowCount > 0) {
        return { conflict: true };
    }

    // INSERT GUEST

    const guestResult = await pool.query(`
        INSERT INTO guests (fullname, check_in, check_out, note)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [fullname, check_in, check_out, note]
    );

    const guestId = guestResult.rows[0].id;

    //INSERT ROOMS
    for (let roomId of rooms) {
        await pool.query(`
            INSERT INTO guest_rooms(guest_id, room_id)
            VALUES ($1, $2)`,
            [guestId, roomId]
        );
    }

    return { success: true };
};