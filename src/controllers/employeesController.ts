import { Router } from 'express';
import Employee from '../database/models/employees';

const router = Router();

router.get('/', async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            res.status(500).json({ message: 'Empleado no encontrado' });
            return;
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar empleado', error });
    }  
});

router.post('/', async (req, res) => {
    try {
        const { personName, personImage, joined, jobDesk, schedule, contact, status } = req.body;

        if ( !personName || !personImage || !joined || !jobDesk || !schedule || !contact || !status ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const newEmployee = new Employee ({ personName, personImage, joined, jobDesk, schedule, contact, status })

        const savedEmployee = await newEmployee.save();
        console.log('Empleado guardado en BD:', savedEmployee);
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error('Error al guardar empleado:', error);
        res.status(500).json({ message: 'Error al agregar empleado', error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { personName, personImage, joined, jobDesk, schedule, contact, status } = req.body;

        if ( !personName || !personImage || !joined || !jobDesk || !schedule || !contact || !status ) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const updateEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            { personName, personImage, joined, jobDesk, schedule, contact, status },
            { new: true, runValidators: true }
        )

        if (!updateEmployee) {
            res.status(404).json({ message: 'Empleado no encontrado' });
        }
        
        res.json(updateEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar empleado', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            res.status(500).json({ message: 'Empleado no encontrado' });
            return;
        }

        res.json({ message: 'Empleado eliminado correctamente', employee });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el empleado', error })
    }
})

export default router;