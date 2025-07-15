import { Router } from 'express';
import Booking from '../database/models/bookings';
import '../database/models/room';
import '../database/models/guest';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room').populate('guest');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas', details: error});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('room').populate('guest');

        if (!booking) {
            res.status(500).json({ message: 'Booking no encontrado' });
            return;
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar booking', error });
    }  
});

router.post('/', async (req, res) => {
    try {
        const { guest, room, createDate, updateDate, deleteDate, checkIn, checkOut, status } = req.body;

        if ( !guest || !room || !createDate || !updateDate || !deleteDate || !checkIn || !checkOut || !status ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newBooking = new Booking ({ guest, room, createDate, updateDate, deleteDate, checkIn, checkOut, status })

        const savedEmployee = await newBooking.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar booking', error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { guest, room, createDate, updateDate, deleteDate, checkIn, checkOut, status } = req.body;

        if ( !guest || !room || !createDate || !updateDate || !deleteDate || !checkIn || !checkOut || !status ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const updateBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { guest, room, createDate, updateDate, deleteDate, checkIn, checkOut, status },
            { new: true, runValidators: true }
        )

        if (!updateBooking) {
            res.status(404).json({ message: 'Booking no encontrado' });
        }
        
        res.json(updateBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar booking', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            res.status(500).json({ message: 'Booking no encontrado' });
            return;
        }

        res.json({ message: 'Booking eliminado correctamente', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar booking', error })
    }
})

export default router;