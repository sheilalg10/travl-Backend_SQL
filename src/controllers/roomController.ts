import { Request, Response } from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../services/roomService";

// Muestra todas las habitaciones
export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error al obtener las habitaciones:", error);
    res.status(500).json({ message: "Error al obtener las habitaciones" });
  }
};

// Muestra una habitacion por su id
export const getRoom = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const room = await getRoomById(id);

    if (!room) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error("Error al obtener la habitación:", error);
    res.status(500).json({ message: "Error al obtener la habitación" });
  }
};

// Crear una nueva habitacion
export const createNewRoom = async (req: Request, res: Response) => {
  try {
    const newRoom = await createRoom(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error al crear la habitación:", error);
    res.status(500).json({ message: "Error al crear la habitación" });
  }
};

// Actualiza una habitacion
export const updateRoomById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedRoom = await updateRoom(id, req.body);

    // if (!updatedRoom) {
    //   return res.status(404).json({ message: 'Habitación no encontrada' });
    // }

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Error al actualizar la habitación:", error);
    res.status(500).json({ message: "Error al actualizar la habitación" });
  }
};

// Elimina una habitacion
export const deleteRoomById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deleted = await deleteRoom(id);

    // if (!deleted) {
    //   return res.status(404).json({ message: "Habitación no encontrada" });
    // }

    res.status(200).json({ message: 'Habitación eliminada correctamente' });

  } catch (error) {
    console.error('Error al eliminar la habitación:', error);
    res.status(500).json({ message: 'Error al eliminar la habitación' });
  }
};
