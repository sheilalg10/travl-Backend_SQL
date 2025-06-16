import { pool } from "../database/db";

// Devuelve todas las habitaciones
export const getAllRooms = async () => {
  const [rows]: any = pool.query("SELECT * FROM rooms");
  return [rows];
};

// Devuelve una habitacion por su id
export const getRoomById = async (id: number) => {
  const [rows]: any = await pool.query("SELECT * FROM rooms WHERE id = ?", [
    id,
  ]);
  return rows[0];
};

export const createRoom = async (room: any) => {
  await pool.query(
    `INSERT INTO rooms (roomNumber, name, bedType, roomFloor, facilities, rate, image, status, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      room.roomNumber,
      room.name,
      room.bedType,
      room.roomFloor,
      JSON.stringify(room.facilities),
      room.rate,
      room.image,
      room.status,
      room.description,
    ]
  );
};

export const updateRoom = async (id: number, room: any) => {
  await pool.query(
    `UPDATE rooms SET roomNumber=?, name=?, bedType=?, roomFloor=?, facilities=?, rate=?, image=?, status=?, description=? WHERE id=?`,
    [
      room.roomNumber,
      room.name,
      room.bedType,
      room.roomFloor,
      JSON.stringify(room.facilities),
      room.rate,
      room.image,
      room.status,
      room.description,
      id,
    ]
  );
};

export const deleteRoom = async (id: number) => {
  await pool.query("DELETE FROM rooms WHERE id=?", [id]);
};
