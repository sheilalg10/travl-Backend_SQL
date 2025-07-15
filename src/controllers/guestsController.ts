import { Router } from 'express';
import Guest from '../database/models/guest';

const router = Router();

router.get('/', async (req, res) => {
    const guests = await Guest.find();
    res.json(guests);
});

router.get('/:id', async (req, res) => {
    try {
        const guest = await Guest.findById(req.params.id);

        if (!guest) {
            res.status(500).json({ message: 'Cliente no encontrado' });
            return;
        }

        res.json(guest);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar cliente', error });
    }  
});

router.post('/', async (req, res) => {
    try {
        const { personName, personImage, specialRequest } = req.body;

        if ( !personName || !personImage || !specialRequest ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newGuest = new Guest ({ personName, personImage, specialRequest })

        const savedGuest = await newGuest.save();
        res.status(201).json(savedGuest);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar cliente', error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { personName, personImage, specialRequest } = req.body;

        if ( !personName || !personImage || !specialRequest ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const updateGuest = await Guest.findByIdAndUpdate(
            req.params.id,
            { personName, personImage, specialRequest },
            { new: true, runValidators: true }
        )

        if (!updateGuest) {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
        
        res.json(updateGuest);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar cliente', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const guest = await Guest.findByIdAndDelete(req.params.id);

        if (!guest) {
            res.status(500).json({ message: 'Cliente no encontrado' });
            return;
        }

        res.json({ message: 'Cliente eliminado correctamente', guest });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error })
    }
})

export default router;