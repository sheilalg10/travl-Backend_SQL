import express from 'express';
import cors from 'cors';

import roomsRouter from './controllers/roomController';
import bookingsRouter from './controllers/bookingsController';
import employeesRouter from './controllers/employeesController';
import guestsRouter from './controllers/guestsController';
import loginRouter from './controllers/loginController';
import infoRouter from './router/apiRouter';
import connectDB from './database/db';

import { authenticateJWT } from './middleware/authJWT';

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/api/login', loginRouter);
app.use('/api/info', infoRouter);

app.use(authenticateJWT);

app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/guests', guestsRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});