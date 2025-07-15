import express from 'express';
import { login } from '../middleware/auth';

const router = express.Router();

router.post('/', async (req, res): Promise<void> => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).json({error: 'Introduce datos de usuario'})
        return
    }

    const token = await login(username, password);

    if (token) {
        res.status(200).json({ token, message: 'Login Exitoso' }); 
    } else {
        res.status(401).json({message: 'Login Incorrecto'})
    }
})

export default router;