import { pool } from "../database/db"

// Devuelve todas las habitaciones
export const getAllRooms = async () => {
    const [rows]: any = pool.query('SELECT * FROM rooms');
    return [rows];
};

// Devuelve una habitacion por su id
export const getRoomById = async (id: number) => {
    const [rows]: any = await pool.query('SELECT * FROM rooms WHERE id = ?', [id]);
    return rows[0];
};

