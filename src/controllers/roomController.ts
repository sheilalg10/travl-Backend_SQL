import { Router } from 'express';
import Room from '../database/models/rooms';


const router = Router();

router.get('/', async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            res.status(500).json({ message: 'Habitación no encontrada' });
            return;
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar habitación', error });
    }  
});


router.post('/', async (req, res) => {
    try {
        const { roomNumber, roomName, bedType, roomFloor, facilities, rate, roomImage, roomStatus, description } = req.body;

        if ( !roomNumber || !roomName || !bedType || !roomFloor || !facilities || !rate || !roomImage || !roomStatus || !description ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newRoom = new Room ({ roomNumber, roomName, bedType, roomFloor, facilities, rate, roomImage, roomStatus, description })

        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar booking', error })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { roomNumber, roomName, bedType, roomFloor, facilities, rate, roomImage, roomStatus, description } = req.body;

        if ( !roomNumber || !roomName || !bedType || !roomFloor || !facilities || !rate || !roomImage || !roomStatus || !description ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { roomNumber, roomName, bedType, roomFloor, facilities, rate, roomImage, roomStatus, description },
            { new: true, runValidators: true }
        )

        if (!updateRoom) {
            res.status(404).json({ message: 'Habitación no encontrada' });
        }
        
        res.json(updateRoom);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar habitación', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        if (!room) {
            res.status(500).json({ message: 'Habitación no encontrada' });
            return;
        }

        res.json({ message: 'Habitación eliminada correctamente', room });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar habitación', error })
    }
})

export default router;