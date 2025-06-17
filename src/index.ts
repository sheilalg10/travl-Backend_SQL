import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import apiRouter from './router/apiRouter';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));