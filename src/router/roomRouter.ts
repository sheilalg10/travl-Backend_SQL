import { Router } from 'express';
import { createNewRoom, deleteRoomById, getRoom, getRooms, updateRoomById } from '../controllers/roomController';

const routerRoom = Router();

routerRoom.get('/', getRooms);
routerRoom.get('/:id', getRoom);
routerRoom.post('/', createNewRoom);
routerRoom.put('/:id', updateRoomById);
routerRoom.delete('/:id', deleteRoomById);

export default routerRoom;